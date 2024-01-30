import { IconProps } from "~assets/icons/iconPropsType";
import { colors } from "~constants/theme";
import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export const ProfileIcon = ({ size, color, secondColor }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16.5833 7C16.5833 9.34721 14.6805 11.25 12.3333 11.25C9.98611 11.25 8.08332 9.34721 8.08332 7C8.08332 4.65279 9.98611 2.75 12.3333 2.75C14.6805 2.75 16.5833 4.65279 16.5833 7Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <Path
      d="M5.28054 14.9571L4.64303 18.4634C4.30821 20.3049 5.72293 22 7.59464 22H17.072C18.9437 22 20.3585 20.3049 20.0236 18.4634L19.3861 14.9571C19.1625 13.7273 18.0914 12.8334 16.8415 12.8334C16.6144 12.8334 16.3878 12.8558 16.1652 12.9003L15.2751 13.0784C13.3331 13.4667 11.3335 13.4667 9.39159 13.0784L8.50151 12.9003C8.27882 12.8558 8.05229 12.8334 7.8252 12.8334C6.57524 12.8334 5.50414 13.7273 5.28054 14.9571Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <Circle
      cx="12.5"
      cy="17.5"
      r="1.5"
      fill={secondColor ? secondColor : colors.Alizarin}
    />
  </Svg>
);
