import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const Image = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <G
      stroke="#F4F4F4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.75}
      clipPath="url(#a)"
    >
      <Path d="M8.75 13.75a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM6.95 26.25c6.962-12.375 12.75-14.55 19.3-6.513" />
      <Path d="M15.35 3.75h-9.1a5 5 0 0 0-5 5v12.5a5 5 0 0 0 5 5h15a5 5 0 0 0 5-5V15M23.438 11.037v-10M19.438 5.037l4-4 4 4" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Image
