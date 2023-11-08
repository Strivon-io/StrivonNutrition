import React, { ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import {
  colors,
  fontSize,
  fontSizePx,
  spacing,
  spacingPx,
} from '../../constants/theme'
import { MainText } from '../atoms/mainText'

interface ButtonProps extends TouchableOpacityProps {
  label: string
}

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${colors.Alizarin};
  padding: ${spacingPx.s};
  align-items: center;
  border-radius: ${spacingPx.xs};
  width: 100%;
`

const ButtonText = styled(MainText)`
  color: ${colors.light.PureWhite};
  font-size: ${fontSizePx.l};
  font-weight: medium;
`

export const MainButton: React.FC<ButtonProps> = ({
  onPress,
  label,
  ...rest
}) => {
  return (
    <ButtonContainer onPress={onPress} {...rest}>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  )
}
