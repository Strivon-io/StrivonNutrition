import { MainText } from "~components/atoms/mainText";
import { AppLayout } from "~components/layout/layout";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { MainButton } from "~components/molecules/mainButton";
import { boxShadow, colors, spacing, spacingPx } from "~constants/theme";
import { useNavigation } from "@react-navigation/native";
import { isSmallScreen } from "~utils/deviceDetector";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { styled } from "styled-components";

export const NeedsResultScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleViewRecipes = () => {
    navigation.navigate("recipesResult");
  };
  return (
    <LayoutSideColumns>
      <AppLayout useSafeAreaView isHeaderLogo>
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
      </AppLayout>
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
