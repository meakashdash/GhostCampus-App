import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Video = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#F4F4F4"
      d="M10.724 9.828H1.758a1.38 1.38 0 0 1-1.38-1.38V1.552a1.38 1.38 0 0 1 1.38-1.38h8.966a1.38 1.38 0 0 1 1.379 1.38v6.896a1.38 1.38 0 0 1-1.38 1.38ZM13.482 2.93V7.07l3.066 2.044a.69.69 0 0 0 1.072-.575V1.461a.69.69 0 0 0-1.072-.574l-3.066 2.044Z"
    />
  </Svg>
)
export default Video
