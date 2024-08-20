import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeGray(props:any) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
      d="M13.935.38a1.3 1.3 0 0 0-1.838 0l-9.1 9.1-2.6 2.6a1.3 1.3 0 1 0 1.838 1.839l.381-.381V22.1a3.9 3.9 0 0 0 3.9 3.9h13a3.9 3.9 0 0 0 3.9-3.9v-8.562l.38.38a1.3 1.3 0 0 0 1.84-1.837L13.935.38Z"
      fill="#EBEBF5"
      fillRule="evenodd"
        fillOpacity={0.5}
      />
    </Svg>
  )
}

export default HomeGray
