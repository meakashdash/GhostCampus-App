import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function HomeGray(props:any) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.612 5.866l-6.72-4.702c-1.832-1.283-4.644-1.213-6.405.152L2.642 5.877C1.475 6.787.553 8.654.553 10.124v8.05c0 2.975 2.415 5.402 5.39 5.402H18.52a5.392 5.392 0 005.39-5.39v-7.91c0-1.575-1.015-3.512-2.298-4.41zm-8.505 13.043a.881.881 0 01-.875.875.881.881 0 01-.875-.875v-3.5c0-.478.396-.875.875-.875.478 0 .875.397.875.875v3.5z"
        fill="url(#paint0_linear_284_1354)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_284_1354"
          x1={-0.321667}
          y1={-14}
          x2={-0.321667}
          y2={28.4952}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F4B0B0" />
          <Stop offset={1} stopColor="#E8E8E8" stopOpacity={0.5} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default HomeGray
