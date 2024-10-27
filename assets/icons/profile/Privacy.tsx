import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Privacy = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#EEE"
      d="M15 27.5A21.875 21.875 0 0 0 26.25 8.375V7.5L15 2.5l-11.25 5v.875A21.875 21.875 0 0 0 15 27.5Zm-1.25-20h2.5V10h-2.5V7.5Zm0 5h2.5v10h-2.5v-10Z"
    />
  </Svg>
)
export default Privacy
