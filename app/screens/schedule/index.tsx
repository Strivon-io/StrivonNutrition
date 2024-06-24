import { FC } from "react";
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

type RecipesScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "schedule"
>;

export const ScheduleScreen: FC<RecipesScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.padding}>
        <PageTitle title={t("Scheduling")} />
      </View>
      <CalendarStrip
        scrollable
        style={{ height: 100 }}
        calendarColor={colors.light.PureWhite}
        calendarHeaderStyle={{ color: "black" }}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        iconContainer={{ flex: 0.1 }}
        markedDates={markedDatesArray}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.PureWhite,
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
