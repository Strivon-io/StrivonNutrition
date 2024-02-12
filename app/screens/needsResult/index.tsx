import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { NavigatorParamList } from "~navigators/app-navigator";
import { Text } from "~components/atoms/text";
import { Layout } from "~components/layout/layout";
import { MainButton } from "~components/molecules/mainButton";
import { boxShadow, colors, spacing } from "~constants/theme";

type NeedResultScreenProps = NativeStackScreenProps<
  NavigatorParamList,
  "needsResult"
>;

export const NeedsResultScreen: FC<NeedResultScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();

  const handleViewRecipes = () => {
    navigation.navigate("recipesResult");
  };

  return (
    <Layout isHeaderLogo>
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
          2700Kcal
        </Text>
        <Text fontFamily="Avenir-Medium" fontSize="l" textAlign="center">
          {t("perDayToMaintainYourCurrentWeight")}
        </Text>
        <TouchableOpacity style={{ marginTop: spacing.xs }}>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
