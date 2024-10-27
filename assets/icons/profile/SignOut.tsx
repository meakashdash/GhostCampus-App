import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SignOut = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#EEE"
      fillRule="evenodd"
      d="M7.5 3.75A3.75 3.75 0 0 0 3.75 7.5v15a3.75 3.75 0 0 0 3.75 3.75h13.75a1.25 1.25 0 1 0 0-2.5H7.5c-.69 0-1.25-.56-1.25-1.25v-15c0-.69.56-1.25 1.25-1.25h13.75a1.25 1.25 0 1 0 0-2.5H7.5Zm12.134 5.366a1.25 1.25 0 0 0-1.768 1.768l2.866 2.866H10a1.25 1.25 0 1 0 0 2.5h10.732l-2.866 2.866a1.25 1.25 0 0 0 1.768 1.768l5-5a1.25 1.25 0 0 0 0-1.768l-5-5Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SignOut
