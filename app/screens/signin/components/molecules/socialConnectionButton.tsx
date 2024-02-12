import { FC } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { styled } from "styled-components";

import { Text } from "~components/atoms/text";
import { colors, spacing, spacingPx } from "~constants/theme";

interface Props {
  icon: JSX.Element;
  text: string;
  style?: ViewStyle;
  onPress: () => void;
}

export const SocialNetworkConnectionButton: FC<Props> = ({
  onPress,
  icon,
  text,
  style,
}) => {
  return (
    <ButtonStyled onPress={onPress} style={style}>
      {icon}
      <Text
        color="darker.DarkestBlack"
        fontSize="m"
        fontFamily="Avenir-Medium"
        ml={spacing.l}
      >
        {text}
      </Text>
    </ButtonStyled>
  );
};

const ButtonStyled = styled(TouchableOpacity)`
  flex-direction: row;
  border-width: 1px;
  padding: ${spacingPx.s};
  border-color: ${colors.medium.StormyCloud};
  width: 100%;
  border-radius: ${spacingPx.xs};
`;
