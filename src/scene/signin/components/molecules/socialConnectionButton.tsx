import React, { ReactNode } from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import { MainText } from '../../../../components/atoms/mainText'
import {
  colors,
  fontSize,
  spacing,
  spacingPx,
} from '../../../../constants/theme'
import { styled } from 'styled-components'

interface SocialNetworkConnectionButtonProps {
  onPress: () => void
  icon: ReactNode
  text: string
  style?: ViewStyle
}

export const SocialNetworkConnectionButton = ({
  onPress,
  icon,
  text,
  style,
}: SocialNetworkConnectionButtonProps) => {
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
  )
}

const ButtonStyled = styled(TouchableOpacity)`
  flex-direction: row;
  border-width: 1px;
  padding: ${spacingPx.s};
  border-color: ${colors.medium.StormyCloud};
  width: 100%;
  border-radius: ${spacingPx.xs};
`
