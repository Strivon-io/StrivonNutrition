import React, { ReactNode } from 'react'
import { Text, TextStyle } from 'react-native'
import styled from 'styled-components/native'
import { colors, fontSize, fontSizePx } from '../../constants/theme'

interface MainTextProps {
  fontWeight?: 'regular' | 'medium' | 'bold' | 'bold-italic'
  fontSize?: number
  color?: string
  children: ReactNode
  style?: TextStyle
}

export const MainText = ({
  fontWeight,
  fontSize,
  color,
  children,
  style,
}: MainTextProps) => {
  return (
    <MainTextStyled
      style={style}
      color={color}
      fontWeight={fontWeight}
      fontSize={fontSize}
    >
      {children}
    </MainTextStyled>
  )
}

interface MainTextStyledProps {
  fontWeight: MainTextProps['fontWeight']
  fontSize?: number
  color: string
}

const MainTextStyled = styled(Text)<MainTextStyledProps>`
  font-family: ${(props) => {
    switch (props.fontWeight) {
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
    props.fontSize ? `${props.fontSize}px` : fontSizePx.m};
  color: ${(props) => (props.color ? props.color : colors.darker.DarkestBlack)};
`
