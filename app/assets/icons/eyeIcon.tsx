import { IconProps } from '~assets/icons/iconPropsType'
import Svg, { Circle, Path } from 'react-native-svg'

export const EyeIcon = ({ size, color }: IconProps) => (
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
    <Path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
)
