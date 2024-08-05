import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const Search = (props:any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M11.385 12.446a6.75 6.75 0 1 1 1.06-1.06l5.156 5.155a.75.75 0 0 1-1.06 1.06l-5.156-5.155Zm-7.926-1.562a5.25 5.25 0 1 1 7.43-.005l-.005.005-.005.004a5.25 5.25 0 0 1-7.42-.004Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Search
