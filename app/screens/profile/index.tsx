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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteUser, getProfile } from "~services/routes/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";

type ProfileScreenProps = NativeStackScreenProps<BottomTabParamList, "profile">;

export const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

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

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
  });

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Layout>
      <>
        <PageTitle title={t("profile")} />
        <View style={styles.userBlock}>
          <View style={styles.profilePictureContainer}>
            <Text
              lineHeight={110}
              textAlign="center"
              color="White"
              fontSize="xxl"
              fontFamily="Avenir-Bold"
            >
              {profileData?.username[0]}
            </Text>
          </View>
          <View style={styles.userNameAndAge}>
            <Text fontSize="l" fontFamily="Avenir-Bold">
              <>
                {profileData?.username}, {calculateAge(profileData.birthday)}
              </>
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
        <View style={styles.buttonsContainer}>
          {/* <MainButton
            onPress={async () => {
              await deleteUserMutation();
              await AsyncStorage.removeItem("accessToken");
              await AsyncStorage.removeItem("refreshToken");
              navigation.navigate("signIn");
            }}
            label={t("profileScreen.deleteAccount")}
            isHighlighted
            style={{
              marginBottom: spacing.s,
            }}
          /> */}
          <MainButton
            onPress={async () => {
              await AsyncStorage.removeItem("accessToken");
              await AsyncStorage.removeItem("refreshToken");
              navigation.navigate("signIn");
            }}
            label={t("profileScreen.logout")}
            isHighlighted
          />
        </View>
      </>
    </Layout>
  );
};


const styles = StyleSheet.create({
  profilePictureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: colors.Alizarin,
    borderRadius: 50,
    verticalAlign: "middle",
  },
  buttonsContainer: {
    marginTop: spacing.m,
  },
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
