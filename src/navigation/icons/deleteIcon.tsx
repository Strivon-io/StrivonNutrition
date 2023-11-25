import { IconProps } from '@components/atoms/icons/iconPropsType'
import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'

export const DeleteIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clip-path="url(#clip0_323_9)">
      <Path
        d="M12 10.5859L16.2426 6.34323L17.6569 7.75744L13.4142 12.0001L17.6569 16.2427L16.2426 17.6569L12 13.4143L7.75736 17.6569L6.34315 16.2427L10.5858 12.0001L6.34315 7.75744L7.75736 6.34323L12 10.5859Z"
        fill={color ? color : 'white'}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_323_9">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
)
