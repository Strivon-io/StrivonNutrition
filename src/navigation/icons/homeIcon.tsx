import { IconProps } from '@components/atoms/icons/iconPropsType'
import { colors } from '@constants/theme'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export const HomeIcon = ({ size, color, secondColor }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3.80455 11.3455V19C3.80455 20.1046 4.69998 21 5.80454 21H7.97727H8.06364C9.16821 21 10.0636 20.1046 10.0636 19V16.4545C10.0636 15.35 10.9591 14.4545 12.0636 14.4545H12.2364C13.3409 14.4545 14.2364 15.35 14.2364 16.4545V19C14.2364 20.1046 15.1318 21 16.2364 21H16.3227H18.4955C19.6 21 20.4955 20.1046 20.4955 19V11.3455M3.80455 11.3455L10.7358 4.41421C11.5168 3.63317 12.7832 3.63316 13.5642 4.41421L20.4955 11.3455M3.80455 11.3455L2.25 13.0244M20.4955 11.3455L22.05 13.0244"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M10 11.5H14.5"
      stroke={secondColor ? secondColor : colors.Alizarin}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
)
