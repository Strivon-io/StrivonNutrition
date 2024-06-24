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

  return (
    <Layout scrollView>
      <PageTitle title={t("Scheduling")} />
      <ScrollView
        style={{
          flex: 1,
          height: 100,
        }}
        horizontal
      >
        <View style={styles.dayContainer}>
          {scheduledRecipesDates.map((date, index) => {
            const dayName = format(date, "EE");
            const dayNumber = format(date, "d");
            const monthName = format(date, "MMMM");
            const isToday = format(date, "Pp") === format(new Date(), "Pp");
            return (
              <TouchableOpacity
                style={[
                  styles.dayBlock,
                  {
                    borderWidth: 1,
                    borderColor: isToday ? "red" : "grey",
                  },
                ]}
                key={index}
                onPress={() => console.log(date)}
              >
                <Text>{dayName}</Text>
                <Text>{dayNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
