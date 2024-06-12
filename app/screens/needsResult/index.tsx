import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { NavigatorParamList } from "~navigators/app-navigator";
import { Text } from "~components/atoms/text";
import { Layout } from "~components/layout/layout";
import { MainButton } from "~components/molecules/mainButton";
import { boxShadow, colors, spacing } from "~constants/theme";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "~services/routes/user.service";

type NeedResultScreenProps = NativeStackScreenProps<
  NavigatorParamList,
  "needsResult"
>;

export const NeedsResultScreen: FC<NeedResultScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const handleViewRecipes = () => {
    navigation.navigate("recipesResult");
  };

  return (
    <Layout isHeader isHeaderLogo>
      {!isLoading ? (
        <>
          <View style={styles.wrapper}>
            <Text fontFamily="Avenir-Medium" fontSize="l" textAlign="center">
              {t("youNeed")}
            </Text>
            <Text
              fontFamily="Avenir-Bold-Italic"
              fontSize="xxl"
              color="Alizarin"
              textAlign="center"
            >
              <>{data.kcalNeeds}Kcal</>
            </Text>
            <Text fontFamily="Avenir-Medium" fontSize="l" textAlign="center">
              {t("perDayToMaintainYourCurrentWeight")}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("needsResultExplanation")}
              style={{ marginTop: spacing.xs }}
            >
              <Text
                fontFamily="Avenir-Medium"
                color="Alizarin"
                textDecorationLine="underline"
                textAlign="center"
              >
                {t("howItWorks")}
              </Text>
            </TouchableOpacity>
          </View>

          <MainButton
            style={boxShadow}
            label={t("viewMyFirstRecipes")}
            onPress={handleViewRecipes}
          />
        </>
      ) : (
        <Text>{t("loading")}</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: spacing.xl,
  },
});
