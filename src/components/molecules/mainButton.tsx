import React, { ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import styled from 'styled-components/native'
import {
  colors,
  fontSizePx,
  iconSize,
  spacing,
  spacingPx,
} from '@constants/theme'
import { MainText } from '@components/atoms/mainText'

interface Props extends TouchableOpacityProps {
  label: string
  icon?: ReactNode
  onPress: () => void
}

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${colors.Alizarin};
  padding: ${spacingPx.s};
  align-items: center;
  border-radius: ${spacingPx.xs};
  width: 100%;
  flex-direction: row;
  justify-content: center;
`

const ButtonText = styled(MainText)`
  color: ${colors.light.PureWhite};
  font-size: ${fontSizePx.l};
  font-weight: medium;
`

export const MainButton = ({ onPress, label, icon }: Props) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{label}</ButtonText>
      <View style={{ marginLeft: spacing.xs }}>{icon}</View>
    </ButtonContainer>
  )
}
