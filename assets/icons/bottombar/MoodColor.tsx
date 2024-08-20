import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MoodColor(props:any) {
  return (
    <Svg
      width={35}
      height={35}
      // viewBox="0 0 27 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
      d="M1.333 10.667h5.334A1.333 1.333 0 0 1 8 12v10.667A1.333 1.333 0 0 1 6.667 24H4a4 4 0 0 1-3.993-3.765L0 20v-8a1.333 1.333 0 0 1 1.333-1.333ZM24 12v8a4 4 0 0 1-3.765 3.993L20 24h-8a1.333 1.333 0 0 1-1.333-1.333V12A1.333 1.333 0 0 1 12 10.667h10.667A1.333 1.333 0 0 1 24 12ZM20 0a4 4 0 0 1 3.993 3.765L24 4v2.667A1.334 1.334 0 0 1 22.667 8H12a1.333 1.333 0 0 1-1.333-1.333V1.333A1.333 1.333 0 0 1 12 0h8ZM8 1.333v5.334A1.333 1.333 0 0 1 6.667 8H1.333A1.333 1.333 0 0 1 0 6.667V4A4 4 0 0 1 3.765.007L4 0h2.667A1.333 1.333 0 0 1 8 1.333Z"
      fill="#F4B0B0"
      />
    </Svg>
  )
}

export default MoodColor
