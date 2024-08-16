import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DownIcon = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={7}
    fill="none"
    {...props}
  >
    <Path
      fill="#F4F4F4"
      d="M10.246.29a1 1 0 0 0-1.41 0l-3.59 3.54L1.706.29a1 1 0 1 0-1.41 1.42l4.24 4.24a1 1 0 0 0 1.42 0l4.29-4.24a1 1 0 0 0 0-1.42Z"
    />
  </Svg>
)
export default DownIcon
