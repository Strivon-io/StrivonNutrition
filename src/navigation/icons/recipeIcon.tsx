import { IconProps } from '@components/atoms/icons/iconPropsType'
import { colors } from '@constants/theme'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export const RecipeIcon = ({ size, color, secondColor }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.57931 7.61351C5.45154 7.61351 6.15863 6.91653 6.15863 6.05676C6.15863 5.19698 5.45154 4.5 4.57931 4.5C3.70708 4.5 2.99999 5.19698 2.99999 6.05676C2.99999 6.91653 3.70708 7.61351 4.57931 7.61351Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.57931 13.8406C5.45154 13.8406 6.15863 13.1436 6.15863 12.2838C6.15863 11.424 5.45154 10.7271 4.57931 10.7271C3.70708 10.7271 2.99999 11.424 2.99999 12.2838C2.99999 13.1436 3.70708 13.8406 4.57931 13.8406Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.57931 20.0675C5.45154 20.0675 6.15863 19.3705 6.15863 18.5107C6.15863 17.651 5.45154 16.954 4.57931 16.954C3.70708 16.954 2.99999 17.651 2.99999 18.5107C2.99999 19.3705 3.70708 20.0675 4.57931 20.0675Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <Path
      d="M9.31726 6.05679H20.3725"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M9.31726 12.2837H20.3725"
      stroke={secondColor ? secondColor : colors.Alizarin}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M9.31726 18.5108H20.3725"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
)
