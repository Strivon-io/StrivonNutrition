import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout } from "~components/layout/layout";
import { PageTitle } from "~components/molecules/pageTitle";
import { BottomTabParamList } from "~navigators/bottom-tab-navigator";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { getScheduledRecipesDates } from "~services/routes/scheduledRecipe.service";
import { Text } from "~components/atoms/text";
import { format } from "date-fns";
import { StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { colors } from "~constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DailyMealsSection } from "~screens/home/components/sections/dailyMealsSection";
import { getDayEvents } from "~services/routes/dayEvents.service";
import { GroceryListSection } from "~screens/home/components/sections/groceryListSection";

type RecipesScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "schedule"
>;

export const ScheduleScreen: FC<RecipesScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const spacing = 8;
  const screenWidth = Dimensions.get("window").width - 40;
  const itemWidth = (screenWidth - 3 * spacing) / 2;

  const {
    data: scheduledRecipesDates,
    isLoading: isLoadingScheduledRecipesDates,
  } = useQuery({
    queryKey: ["scheduledRecipesDates"],
    queryFn: getScheduledRecipesDates,
  });

  const markedDatesArray = scheduledRecipesDates?.map((date) => ({
    date: format(date, "yyyy-MM-dd"),
    dots: [
      {
        color: colors.Alizarin,
        selectedColor: colors.Alizarin,
      },
    ],
  }));

  const dayName = format(selectedDate, "EEEE");
  const dayNumber = format(selectedDate, "dd");
  const monthName = format(selectedDate, "MMMM");

  const { data: dayEventsData, isLoading } = useQuery({
    queryKey: ["dayEvents", selectedDate],
    queryFn: () => getDayEvents(new Date(selectedDate)),
  });

  console.log("test", dayEventsData);

  return (
    <View style={[styles.container, { paddingTop: 70 }]}>
      <View style={styles.padding}>
        <PageTitle title={t("Scheduling")} />
      </View>

      <CalendarStrip
        scrollable
        style={{ height: 100, marginTop: 20 }}
        calendarColor={colors.light.PureWhite}
        calendarHeaderStyle={{ color: "black" }}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        iconContainer={{ flex: 0.1 }}
        onDateSelected={(date) => {
          setSelectedDate(date.toDate());
        }}
        selectedDate={selectedDate}
        markedDates={markedDatesArray}
      />
      <View style={styles.padding}>
        <Text fontFamily="Avenir-Bold-Italic" fontSize="l">
          <>
            {dayName} {dayNumber} {monthName}
          </>
        </Text>
      </View>
      <ScrollView style={styles.padding}>
        <DailyMealsSection
          navigation={navigation}
          scheduledRecipes={dayEventsData?.scheduledRecipes}
        />
        <GroceryListSection shoppingList={dayEventsData?.shoppingList} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.PureWhite,
  },
  padding: {
    paddingHorizontal: 20,
  },
  dayContainer: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,

    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dayBlock: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 100,
  },
});
