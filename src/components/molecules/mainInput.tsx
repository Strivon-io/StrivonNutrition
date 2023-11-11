import React from 'react'
import { TextInput, View } from 'react-native'
import { colors, spacing, spacingPx } from '../../constants/theme'
import { styled } from 'styled-components/native'
import { MainText } from '../atoms/mainText'

interface InputProps {
  placeholder?: string
  label?: string
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

export const MainInput = ({
  label,
  placeholder,
  secureTextEntry,
  onChangeText,
  keyboardType,
  value,
}: InputProps) => {
  return (
    <View>
      {label && (
        <MainText fontType="medium" color={colors.Alizarin} fontSize="m">
          {label}
        </MainText>
      )}
      <StyledInput
        placeholder={placeholder}
        placeholderTextColor={colors.medium.LinkWater}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}

const StyledInput = styled(TextInput)`
  width: 100%;
  padding: ${spacingPx.s};
  margin: ${spacingPx.xs} 0;
  background-color: ${colors.light.AliceBlue};
  border-radius: ${spacingPx.xs};
  font-family: 'AvenirNext-Medium';
`
