import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'

export const FacebookIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G>
      <Path
        fill="#3577E5"
        d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z"
      />
      <Path
        fill="#fff"
        d="M10.933 15.933v-5.4h1.8L13 8.4h-2.067V7.067c0-.6.2-1 1.067-1h1.133V4.133c-.2 0-.866-.066-1.6-.066-1.6 0-2.733 1-2.733 2.8V8.4H7v2.133h1.8v5.4h2.133Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
