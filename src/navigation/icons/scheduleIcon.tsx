import { IconProps } from '@components/atoms/icons/iconPropsType'
import { colors } from '@constants/theme'
import * as React from 'react'
import Svg, { Circle, Ellipse, Path } from 'react-native-svg'

export const ScheduleIcon = ({ size, color, secondColor }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.7846L3 6.0769C3 5.52462 3.44772 5.0769 4 5.0769L7.5 5.0769M3 9.7846L3 19.5846C3 20.1369 3.44772 20.5846 4 20.5846L20 20.5846C20.5523 20.5846 21 20.1369 21 19.5846L21 9.7846M3 9.7846L21 9.7846M21 9.7846L21 6.0769C21 5.52462 20.5523 5.0769 20 5.0769L16.5 5.0769M7.5 5.0769L12 5.0769L16.5 5.0769M7.5 5.0769L16.5 5.0769"
      stroke={color}
      strokeWidth="1.5"
    />
    <Path
      d="M8.12308 3V7.15385M15.8769 3V7.15385"
      stroke={secondColor ? secondColor : colors.Alizarin}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Ellipse
      cx="8.12308"
      cy="12.9692"
      rx="0.830769"
      ry="0.83077"
      fill={color}
    />
    <Ellipse
      cx="8.12308"
      cy="17.2616"
      rx="0.830769"
      ry="0.83077"
      fill={color}
    />
    <Circle cx="12" cy="12.9692" r="0.83077" fill={color} />
    <Circle cx="12" cy="17.2616" r="0.83077" fill={color} />
    <Ellipse cx="15.8769" cy="12.9692" rx="0.83077" ry="0.83077" fill={color} />
    <Ellipse cx="15.8769" cy="17.2616" rx="0.83077" ry="0.83077" fill={color} />
  </Svg>
)
