import * as React from 'react'
import { Path, Svg } from 'react-native-svg'
import { colors } from '../../../constants/theme'
import { IconProps } from './iconPropsType'

export const LeftArrow = ({ color, size }: IconProps) => (
  <Svg
    width={size ? size : 24}
    height={size ? size : 24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M9.27361 5.00002L2.55933 11.7143L9.27361 18.4286"
      stroke={color ? color : colors.light.PureWhite}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.5833 11.7144L2.55944 11.7144"
      stroke={color ? color : colors.light.PureWhite}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
)
