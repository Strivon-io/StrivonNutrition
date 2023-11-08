import React from 'react'
import { TextInput } from 'react-native'
import { colors, spacing, spacingPx } from '../../constants/theme'
import { styled } from 'styled-components/native'

interface InputProps {
  placeholder: string
  secureTextEntry?: boolean
  onChangeText?: (text: string) => void
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'visible-password'
  value?: string
}

export const MainInput: React.FC<InputProps> = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  keyboardType,
  value,
}: InputProps) => {
  return (
    <StyledInput
      placeholder={placeholder}
      placeholderTextColor={colors.medium.LinkWater}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
    />
  )
}

const StyledInput = styled(TextInput)`
  width: 100%;
  padding: ${spacingPx.m};
  margin: ${spacingPx.xs} 0;
  background-color: ${colors.light.AliceBlue};
  border-radius: ${spacingPx.xs};
  font-family: 'AvenirNext-Medium';
`
