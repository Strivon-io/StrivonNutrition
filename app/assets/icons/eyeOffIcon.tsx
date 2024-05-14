import { IconProps } from '~assets/icons/iconPropsType'
import Svg, { Line, Path } from 'react-native-svg'

export const EyeOffIcon = ({ size, color }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ? color : 'black'}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <Path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <Path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <Path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <Line x1="2" x2="22" y1="2" y2="22" />
  </Svg>
)
