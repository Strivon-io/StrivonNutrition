import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'

export const AppleIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M14.04 19.2c-1.084 1.052-2.28.888-3.42.392-1.212-.506-2.32-.538-3.6 0-1.594.688-2.44.488-3.4-.392C-1.8 13.62-1 5.12 5.16 4.8c1.494.08 2.54.826 3.42.888 1.308-.266 2.56-1.028 3.96-.928 1.682.136 2.94.8 3.78 1.994-3.46 2.08-2.64 6.64.538 7.92-.636 1.67-1.452 3.32-2.82 4.54l.002-.014ZM8.46 4.74C8.298 2.26 10.308.22 12.62.02c.318 2.86-2.6 5-4.16 4.72Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16.84v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
