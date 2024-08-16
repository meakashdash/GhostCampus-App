import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function HomeColor(props:any) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.38 6.566l-6.72-4.702C12.828.581 10.017.651 8.255 2.016L2.41 6.578C1.243 7.488.32 9.354.32 10.824v8.05c0 2.975 2.415 5.402 5.39 5.402h12.577a5.392 5.392 0 005.39-5.39v-7.91c0-1.575-1.015-3.512-2.298-4.41zm-8.505 13.043a.881.881 0 01-.875.875.881.881 0 01-.875-.875v-3.5c0-.478.396-.875.875-.875.478 0 .875.397.875.875v3.5z"
        fill="url(#paint0_linear_284_1072)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_284_1072"
          x1={11.9998}
          y1={0.945312}
          x2={11.9998}
          y2={43.4405}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F4B0B0" />
          <Stop offset={1} stopColor="#E8E8E8" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default HomeColor
