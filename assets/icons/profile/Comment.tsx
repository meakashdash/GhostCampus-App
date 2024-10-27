import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const Comments = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#EEE"
        fillRule="evenodd"
        d="M22.5 15a1.876 1.876 0 1 1 .001-3.751A1.876 1.876 0 0 1 22.5 15ZM15 15a1.876 1.876 0 1 1 .001-3.751A1.876 1.876 0 0 1 15 15Zm-7.5 0a1.876 1.876 0 1 1 .001-3.751A1.876 1.876 0 0 1 7.5 15ZM15 0C6.716 0 0 5.877 0 13.125c0 4.143 2.198 7.832 5.625 10.237V30l6.57-3.987c.91.15 1.846.237 2.805.237 8.284 0 15-5.876 15-13.125C30 5.877 23.284 0 15 0Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Comments
