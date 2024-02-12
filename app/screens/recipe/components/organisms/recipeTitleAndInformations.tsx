import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";

import { Text } from "~components/atoms/text";
import { boxShadow, colors, spacingPx, spacing } from "~constants/theme";

interface Props {
  title: string;
  informations: {
    protein: number;
    carbohydrate: number;
    calories: number;
  };
}

export const RecipeTitleAndInformations: FC<Props> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.recipeNameAndInformations}>
      <Text fontFamily="Avenir-Bold-Italic" fontSize="m" textAlign="center">
        {title}
      </Text>
      <InformationsWrapper>
        <InformationBlock title={t("protein")} value={"19g"} />
        <InformationBlock title={t("calories")} value={"540"} />
        <InformationBlock title={t("carbohydrate")} value={"19g"} />
      </InformationsWrapper>
    </View>
  );
};

const InformationBlock = ({ title, value }) => {
  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <Text color="Alizarin" fontFamily="Avenir-Bold-Italic" fontSize="m">
        {title}
      </Text>
      <Text fontFamily="Avenir-Medium" fontSize="m">
        {value}
      </Text>
    </View>
  );
};

const InformationsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacingPx.s};
`;

const styles = StyleSheet.create({
  recipeNameAndInformations: {
    ...boxShadow,
    width: "100%",
    backgroundColor: colors.light.PureWhite, // Assurez-vous que cette couleur est définie quelque part
    height: 150,
    alignSelf: "center",
    transform: [{ translateY: -80 }], // Ajustement pour React Native
    borderRadius: spacing.xs, // Assurez-vous que cette valeur est définie quelque part
    padding: spacing.l, // Assurez-vous que cette valeur est définie quelque part
    zIndex: 100,
    justifyContent: "center",
  },
});
