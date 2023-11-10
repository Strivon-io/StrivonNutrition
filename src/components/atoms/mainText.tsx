import React, { ReactNode } from 'react'
import { Text, TextStyle } from 'react-native'
import styled from 'styled-components/native'
import { colors, fontSizePx, FontSize, FontType } from '../../constants/theme'

interface MainTextProps {
  fontType?: keyof FontType
  fontSize?: keyof FontSize
  color?: string
  children: ReactNode
  style?: TextStyle
  underline?: boolean
}

export const MainText = ({
  fontType,
  fontSize,
  color,
  children,
  style,
  underline,
}: MainTextProps) => {
  return (
    <MainTextStyled
      style={style}
      color={color}
      fontType={fontType}
      fontSize={fontSize}
      underline={underline}
    >
      {children}
    </MainTextStyled>
  )
}

interface MainTextStyledProps {
  fontType: MainTextProps['fontType']
  fontSize?: keyof FontSize
  color: string
  underline: boolean
}

const MainTextStyled = styled(Text)<MainTextStyledProps>`
  font-family: ${(props) => {
    switch (props.fontType) {
      case 'regular':
        return 'AvenirNext-Regular'
      case 'medium':
        return 'AvenirNext-Medium'
      case 'bold':
        return 'AvenirNext-Bold'
      case 'bold-italic':
        return 'AvenirNext-BoldItalic'
      default:
        return 'AvenirNext-Regular'
    }
  }};
  font-size: ${(props) =>
    props.fontSize ? `${fontSizePx[props.fontSize]}` : fontSizePx.m};
  color: ${(props) => (props.color ? props.color : colors.darker.DarkestBlack)};
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  text-decoration-color: ${colors.Alizarin};
`
