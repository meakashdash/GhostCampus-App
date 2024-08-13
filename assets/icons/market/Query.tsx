import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Query = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <G
      stroke="#FDFDFD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      filter="url(#a)"
    >
      <Path d="m21.673 7.823-4.658 4.214c-.882.776-2.117.776-2.999 0L9.318 7.823" />
      <Path
        d="M10.338 1h10.295c1.484.019 2.897.724 3.91 1.951 1.012 1.227 1.535 2.87 1.448 4.544v8.01c.087 1.674-.436 3.317-1.448 4.544-1.013 1.227-2.426 1.932-3.91 1.951H10.338C7.149 22 5 19.085 5 15.505v-8.01C5 3.915 7.149 1 10.338 1Z"
        clipRule="evenodd"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default Query
