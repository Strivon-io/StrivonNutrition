import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";
import { styled } from "styled-components";

import { MainText } from "~components/atoms/mainText";
import { Layout } from "~components/layout/layout";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { MainButton } from "~components/molecules/mainButton";
import { boxShadow, colors, spacing, spacingPx } from "~constants/theme";
import { isSmallScreen } from "~utils/deviceDetector";

export const NeedsResultScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const handleViewRecipes = () => {
    navigation.navigate("recipesResult");
  };

  return (
    <LayoutSideColumns>
      <Layout useSafeAreaView isHeaderLogo>
        <Wrapper>
          <MainText fontType="medium" fontSize="l">
            {t("youNeed")}
          </MainText>
          <MainText
            fontType="bold-italic"
            fontSize="xxl"
            color={colors.Alizarin}
          >
            2700Kcal
          </MainText>
          <MainText
            style={{ width: 300 }}
            fontType="medium"
            fontSize="l"
            textAlign="center"
          >
            {t("perDayToMaintainYourCurrentWeight")}
          </MainText>
          <TouchableOpacity style={{ marginTop: spacing.xs }}>
            <MainText fontType="medium" color={colors.Alizarin} underline>
              {t("howItWorks")}
            </MainText>
          </TouchableOpacity>
        </Wrapper>
        <ButtonWrapper>
          <MainButton
            style={boxShadow}
            label={t("viewMyFirstRecipes")}
            onPress={handleViewRecipes}
          />
        </ButtonWrapper>
      </Layout>
    </LayoutSideColumns>
  );
};

const Wrapper = styled(View)`
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const ButtonWrapper = styled(View)`
  position: absolute;
  padding-top: ${spacingPx.m};
  width: 100%;
  bottom: ${isSmallScreen ? spacingPx.m : spacingPx.l};
  background-color: ${colors.light.PureWhite};
`;
