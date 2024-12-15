import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BackButton = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#EEE"
      d="m3.825 9 5.6 5.6L8 16 0 8l8-8 1.425 1.4-5.6 5.6H16v2H3.825Z"
    />
  </Svg>
)
export default BackButton
