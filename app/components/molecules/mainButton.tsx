import React, { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import styled, { css } from "styled-components/native";
import { colors, spacing, spacingPx } from "~constants/theme";
import { MainText } from "~components/atoms/mainText";
import { isSmallScreen } from "~utils/deviceDetector";

interface Props extends TouchableOpacityProps {
  label: string;
  icon?: ReactNode;
  isHighlighted?: boolean;
  onPress: () => void;
  style?: {};
}

const MainButtonStyled = css`
  background-color: ${colors.Alizarin};
`;

const HighlightedButtonStyle = css`
  background-color: transparent;
`;

const ButtonContainer = styled(TouchableOpacity)<{ isHighlighted?: boolean }>`
  ${(props) =>
    props.isHighlighted ? HighlightedButtonStyle : MainButtonStyled}
  padding: ${spacingPx.s};
  align-items: center;
  border-radius: ${spacingPx.xs};
  width: 100%;
  flex-direction: row;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.Alizarin};
`;

const ButtonText = styled(MainText)<{ isHighlighted?: boolean }>`
  color: ${(props) =>
    props.isHighlighted ? colors.Alizarin : colors.light.PureWhite};
`;

export const MainButton = ({
  onPress,
  label,
  icon,
  isHighlighted,
  style,
}: Props) => {
  return (
    <ButtonContainer
      style={style}
      onPress={onPress}
      isHighlighted={isHighlighted}
    >
      <ButtonText
        fontType="medium"
        fontSize={isSmallScreen ? "s" : "m"}
        isHighlighted={isHighlighted}
      >
        {label}
      </ButtonText>
      <View style={{ marginLeft: spacing.xs }}>{icon}</View>
    </ButtonContainer>
  );
};
