import { ReactNode, FC } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { styled } from "styled-components";

import { MainText } from "~components/atoms/mainText";
import { colors, spacing, spacingPx } from "~constants/theme";

interface Props {
  icon: ReactNode;
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
      <MainText
        color={colors.darker.DarkestBlack}
        fontSize="m"
        fontType="medium"
        style={{ marginLeft: spacing.l }}
      >
        {text}
      </MainText>
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
