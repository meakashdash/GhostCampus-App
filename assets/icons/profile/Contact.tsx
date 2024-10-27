import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Contact = (props: SvgProps) => (
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
      d="M27.5 5v20h-25V5h25Zm-3.75 12.5h-7.5v1.875h7.5V17.5ZM9.844 14.125h-.938c-1.812 0-3.281 1.5-3.281 3.375h7.5c0-1.875-1.475-3.375-3.281-3.375Zm13.906-.375h-7.5v1.875h7.5V13.75ZM9.375 9.607a1.64 1.64 0 1 0 0 3.281 1.64 1.64 0 0 0 0-3.281ZM23.75 10h-7.5v1.875h7.5V10Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Contact
