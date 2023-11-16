import * as React from 'react'
import { Path, Svg } from 'react-native-svg'
import { colors } from '../../../constants/theme'
import { IconProps } from './iconPropsType'

export const RightChevron = ({ color, size }: IconProps) => (
  <Svg
    width={size ? size : 24}
    height={size ? size : 24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M7.5 21L16.5 12L7.5 3"
      stroke={color ? color : colors.light.PureWhite}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
