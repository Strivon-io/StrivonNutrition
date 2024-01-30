import * as React from "react";
import { G, Path, Svg } from "react-native-svg";
import { colors } from "../../constants/theme";
import { IconProps } from "./iconPropsType";

export const LoopIcon = ({ color, size }: IconProps) => (
  <Svg height={size} width={size} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0_74_595)">
      <Path
        d="M7.33331 1.33331C10.6453 1.33331 13.3333 4.02131 13.3333 7.33331C13.3333 10.6453 10.6453 13.3333 7.33331 13.3333C4.02131 13.3333 1.33331 10.6453 1.33331 7.33331C1.33331 4.02131 4.02131 1.33331 7.33331 1.33331ZM7.33331 12C9.91131 12 12 9.91131 12 7.33331C12 4.75465 9.91131 2.66665 7.33331 2.66665C4.75465 2.66665 2.66665 4.75465 2.66665 7.33331C2.66665 9.91131 4.75465 12 7.33331 12ZM12.99 12.0473L14.876 13.9326L13.9326 14.876L12.0473 12.99L12.99 12.0473Z"
        fill={color ? color : colors.light.PureWhite}
      />
    </G>
  </Svg>
);
