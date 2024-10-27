import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const RightArrow = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#EEE"
      fillRule="evenodd"
      d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0Zm7.84 14.483c.661-1.474-.85-2.984-2.324-2.323l-12.13 5.438c-1.786.8-1.863 3.308-.13 4.216l2.54 1.33c.453.237.823.607 1.06 1.06l1.33 2.54c.908 1.733 3.416 1.657 4.216-.13l5.438-12.13Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default RightArrow
