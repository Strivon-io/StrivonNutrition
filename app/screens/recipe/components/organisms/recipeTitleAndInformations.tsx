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

export const RecipeTitleAndInformations: FC<Props> = ({
  title,
  informations,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.recipeNameAndInformations}>
      <Text fontFamily="Avenir-Bold-Italic" fontSize="m" textAlign="center">
        {title}
      </Text>
      <InformationsWrapper>
        <InformationBlock
          title={t("protein")}
          value={informations.protein}
          unity="g"
        />
        <InformationBlock
          title={t("calories")}
          value={informations.calories}
          unity="Kcal"
        />
        <InformationBlock
          title={t("carbohydrate")}
          value={informations.carbohydrate}
          unity="g"
        />
      </InformationsWrapper>
    </View>
  );
};

interface InformationBlockProps {
  title: string;
  value: number;
  unity: string;
}

const InformationBlock = ({ title, value, unity }: InformationBlockProps) => {
  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <Text color="Alizarin" fontFamily="Avenir-Bold-Italic" fontSize="m">
        {title}
      </Text>
      <Text fontFamily="Avenir-Medium" fontSize="m">
        {`${value.toString()}${unity}`}
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
    backgroundColor: colors.light.PureWhite,
    height: 150,
    alignSelf: "center",
    transform: [{ translateY: -80 }],
    borderRadius: spacing.xs,
    padding: spacing.l,
    zIndex: 100,
    justifyContent: "center",
  },
});
