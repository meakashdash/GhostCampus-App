import * as React from "react"
import Svg, { Path } from "react-native-svg"
const AddItem = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F4F4F4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={5}
      d="M3 13h20M13 3v20"
    />
  </Svg>
)
export default AddItem
