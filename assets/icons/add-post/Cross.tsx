import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Cross = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#888"
      stroke="#000"
      d="M6.949 9.354 7.302 9l-.353-.354L.852 2.55A1.2 1.2 0 1 1 2.55.852l6.096 6.097.354.353.354-.353L15.45.852a1.2 1.2 0 1 1 1.697 1.698l-6.097 6.096-.353.354.353.354 6.097 6.097a1.2 1.2 0 0 1-1.697 1.697l-6.097-6.097L9 10.698l-.354.353-6.096 6.097a1.2 1.2 0 0 1-1.698 0l-.353.353.353-.353a1.2 1.2 0 0 1 0-1.697l6.097-6.097Z"
    />
  </Svg>
)
export default Cross
