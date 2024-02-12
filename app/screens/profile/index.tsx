import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";

import { ParamsIcon } from "~assets/icons/paramsIcon";
import { Text } from "~components/atoms/text";
import { Layout } from "~components/layout/layout";
import { PageTitle } from "~components/molecules/pageTitle";
import { SectionTitle } from "~components/organisms/sectionTitle";
import { colors, spacing } from "~constants/theme";
import { BottomTabParamList } from "~navigators/bottom-tab-navigator";

import { MainButton } from "~components/molecules/mainButton";

type ProfileScreenProps = NativeStackScreenProps<BottomTabParamList, "profile">;

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const { t } = useTranslation();

  // the sorting for the 3 last months may be in the back later
  const weightData = [
    { weight: 50.0, date: "2023-12-02" },
    { weight: 50.5, date: "2023-12-010" },
    { weight: 51.0, date: "2024-01-01" },
    { weight: 51.5, date: "2024-01-03" },
    { weight: 52.0, date: "2024-01-06" },
    { weight: 52.5, date: "2024-02-07" },
    { weight: 53.0, date: "2024-02-08" },
    { weight: 53.5, date: "2024-02-09" },
    { weight: 54.0, date: "2024-02-10" },
    { weight: 54.5, date: "2024-02-11" },
  ];

  const getLastThreeMonthsData = (weightData) => {
    const today = new Date();
    const threeMonthsAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 3,
      today.getDate()
    );

    const filteredData = weightData.filter(
      ({ date }) => new Date(date) >= threeMonthsAgo
    );

    const dataByMonth = {};

    filteredData.forEach(({ weight, date }) => {
      const monthYearKey = new Date(date).toLocaleDateString("fr-FR", {
        month: "short",
        year: "numeric",
      });
      dataByMonth[monthYearKey] = weight;
    });

    const labels = [];
    const data = [];

    Object.keys(dataByMonth).forEach((key) => {
      labels.push(key);
      data.push(dataByMonth[key]);
    });

    return { labels, data };
  };

  const { labels, data } = getLastThreeMonthsData(weightData);

  const chartData = {
    labels,
    datasets: [
      {
        data,
      },
    ],
  };

  return (
    <Layout>
      <>
        <PageTitle
          title={t("profile")}
          rightChild={
            <TouchableOpacity>
              <ParamsIcon color={colors.Alizarin} />
            </TouchableOpacity>
          }
        />
        <View style={styles.userBlock}>
          <Image
            source={require("~assets/profileExemple/profile.png")}
            style={styles.profilePicture}
          />
          <View style={styles.userNameAndAge}>
            <Text fontSize="l" fontFamily="Avenir-Bold">
              Hugues, 23
            </Text>
          </View>
        </View>
        <SectionTitle title={t("weightEvolution")} />
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 30}
          height={200}
          yAxisLabel=""
          yAxisSuffix="kg"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: colors.Alizarin,
            backgroundGradientFrom: colors.Bloody,
            backgroundGradientTo: colors.Alizarin,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: colors.Alizarin,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <MainButton
          onPress={() => {}}
          label={t("updateWeight")}
          isHighlighted
        />
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  userBlock: {
    flexDirection: "column",
    rowGap: spacing.s,
    alignSelf: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userNameAndAge: {
    flexDirection: "row",
  },
});
