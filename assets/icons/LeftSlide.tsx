import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LeftSlide(props:any) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.81.613l1.442 1.442-5.907 5.908 5.907 5.907-1.442 1.442-7.35-7.35L7.81.614z"
        fill="#fff"
      />
    </Svg>
  )
}

export default LeftSlide
