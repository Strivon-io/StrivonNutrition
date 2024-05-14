import * as React from 'react'
import { Path, Svg } from 'react-native-svg'
import { colors } from '../../constants/theme'
import { IconProps } from './iconPropsType'

export const DownChevron = ({ color, size }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ? color : colors.darker.DarkestBlack}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <Path d="m6 9 6 6 6-6" />
  </Svg>
)
