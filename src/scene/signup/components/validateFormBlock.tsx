import { RightChevron } from "@assets/icons/rightChevron";
import { MainCheckbox } from "@components/atoms/mainCheckbox";
import { MainText } from "@components/atoms/mainText";
import { LayoutSideColumns } from "@components/layout/layoutSideColumns";
import { MainButton } from "@components/molecules/mainButton";
import {
  boxShadow,
  colors,
  iconSize,
  spacing,
  spacingPx,
} from "@constants/theme";
import { isSmallScreen } from "@utils/deviceDetector";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { styled } from "styled-components";

interface Props {
  signUpStep: number;
  handleValidate: () => void;
  isChecked: boolean;
  handleCheck: () => void;
}

export const ValidateFormBlock = ({
  signUpStep,
  isChecked,
  handleCheck,
  handleValidate,
}: Props) => {
  const { t } = useTranslation();

  return (
    <ValidateFormBlockWrapper>
      <LayoutSideColumns>
        <View
          style={{
            marginBottom: isSmallScreen ? spacing.m : spacing.l,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ marginRight: spacing.xs }}>
              <MainCheckbox isChecked={isChecked} setIsChecked={handleCheck} />
            </View>
            <TouchableOpacity onPress={handleCheck}>
              <MainText>{t("i-accept-the")}</MainText>
            </TouchableOpacity>
            <MainText color={colors.Alizarin} underline>
              {" "}
              {t("terms-of-use")}
            </MainText>
          </View>
          <View style={{ marginTop: spacing.m }}>
            <MainButton
              style={boxShadow}
              label={
                signUpStep === 0 ? t("next") : t("calculate-my-calories-need")
              }
              onPress={handleValidate}
              icon={signUpStep === 0 && <RightChevron size={iconSize.s} />}
            />
          </View>
        </View>
      </LayoutSideColumns>
    </ValidateFormBlockWrapper>
  );
};

const ValidateFormBlockWrapper = styled(View)`
  position: absolute;
  padding-top: ${spacingPx.m};
  width: 100%;
  bottom: 0;
  background-color: ${colors.light.PureWhite};
`;
