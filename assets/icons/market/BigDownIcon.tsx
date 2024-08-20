import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BigDownIcon = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#F4F4F4"
      d="M12 14a2 2 0 0 1-1.41-.59l-10-10A2 2 0 0 1 3.41.59L12 9.17 20.59.59a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 12 14Z"
    />
  </Svg>
)
export default BigDownIcon
