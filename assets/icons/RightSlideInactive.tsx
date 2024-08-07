import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RightSlideInactive(props:any) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.099 15.312L.656 13.87l5.908-5.907L.656 2.055 2.1.613l7.35 7.35-7.35 7.35z"
        fill="#fff"
        fillOpacity={0.2}
      />
    </Svg>
  )
}

export default RightSlideInactive
