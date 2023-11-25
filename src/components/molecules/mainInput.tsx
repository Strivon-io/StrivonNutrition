import React from 'react'
import { TextInput, View } from 'react-native'
import { colors, spacing, spacingPx } from '../../constants/theme'
import { styled } from 'styled-components/native'
import { MainText } from '../atoms/mainText'
import { HomeIcon } from '@navigation/icons/homeIcon'

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
  style?: {}
  placeholderTextColor?: string
  textColor?: string
  fontType?: string
  leftIcon?: React.ReactNode
}

export const MainInput = ({
  label,
  placeholder,
  secureTextEntry,
  onChangeText,
  keyboardType,
  value,
  style = {},
  textColor,
  fontType,
  leftIcon,
}: InputProps) => {
  return (
    <View style={style}>
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
        textColor={textColor}
        fontType={fontType}
      />
    </View>
  )
}

const StyledInput = styled(TextInput)<{ textColor: string; fontType: string }>`
  width: 100%;
  padding: ${spacingPx.s};
  margin: ${spacingPx.xs} 0;
  background-color: ${colors.light.AliceBlue};
  border-radius: ${spacingPx.xs};
  font-family: ${(props) =>
    props.fontType
      ? `AvenirNext-${
          props.fontType.substring(0, 1).toUpperCase() +
          props.fontType.substring(1)
        }`
      : 'AvenirNext-Medium'};
  color: ${(props) =>
    props.textColor ? props.textColor : colors.darker.DarkestBlack};
`
