import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import styled from "styled-components";

import { Text } from "~components/atoms/text";
import { boxShadow, colors, spacingPx } from "~constants/theme";

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
    <RecipeNameAndInformations>
      <Text fontFamily="Avenir-Bold-Italic" fontSize="l" textAlign="center">
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
    </RecipeNameAndInformations>
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

const RecipeNameAndInformations = styled(View)`
  ${boxShadow}
  width: 100%;
  background-color: ${colors.light.PureWhite};
  height: 150px;
  align-self: center;
  transform: translateY(-80px);
  border-radius: ${spacingPx.xs};
  padding: ${spacingPx.l};
  z-index: 100;
  justify-content: center;
`;
