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

export const RecipeTitleAndInformations: FC<Props> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <RecipeNameAndInformations>
      <Text fontFamily="Avenir-Bold-Italic" fontSize="m" textAlign="center">
        {title}
      </Text>
      <InformationsWrapper>
        <InformationBlock title={t("protein")} value={"19g"} />
        <InformationBlock title={t("calories")} value={"540"} />
        <InformationBlock title={t("carbohydrate")} value={"19g"} />
      </InformationsWrapper>
    </RecipeNameAndInformations>
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
