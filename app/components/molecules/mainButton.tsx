import { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import styled, { css } from "styled-components/native";

import { colors, spacing, spacingPx } from "~constants/theme";
import { Text } from "~components/atoms/text";
import { isSmallScreen } from "~utils/deviceDetector";

interface Props extends TouchableOpacityProps {
  label: string;
  icon?: JSX.Element;
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

export const MainButton: FC<Props> = ({
  onPress,
  label,
  icon,
  isHighlighted,
  style,
}) => {
  return (
    <ButtonContainer
      style={style}
      onPress={onPress}
      isHighlighted={isHighlighted}
    >
      <Text
        fontFamily="Avenir-Medium"
        fontSize={isSmallScreen ? "s" : "m"}
        color={isHighlighted ? "Alizarin" : "light.PureWhite"}
      >
        {label}
      </Text>
      <View style={{ marginLeft: spacing.xs }}>{icon}</View>
    </ButtonContainer>
  );
};
