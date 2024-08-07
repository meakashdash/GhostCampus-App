import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MarketGray(props:any) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 27 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.12 2.863h20.042c.787 0 1.431-.644 1.431-1.431C24.593.644 23.95 0 23.162 0H3.119c-.787 0-1.431.644-1.431 1.432 0 .787.644 1.431 1.431 1.431zM24.821 5.44a1.428 1.428 0 00-1.403-1.145H2.861c-.687 0-1.274.487-1.403 1.145L.027 12.598a1.438 1.438 0 001.403 1.718h.258v7.158c0 .787.644 1.432 1.431 1.432h11.453c.787 0 1.432-.645 1.432-1.432v-7.158h5.726v7.158c0 .787.644 1.432 1.432 1.432.787 0 1.431-.645 1.431-1.432v-7.158h.258c.902 0 1.575-.83 1.403-1.718L24.822 5.44zM13.14 20.042H4.55v-5.726h8.59v5.726z"
        fill="#EBEBF5"
        fillOpacity={0.5}
      />
    </Svg>
  )
}

export default MarketGray
