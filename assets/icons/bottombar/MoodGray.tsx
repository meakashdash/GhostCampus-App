import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MoodGray(props:any) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 27 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.44 12.6h-7.3v5.728h7.3v-5.727zM18.98 0v2.291H7.3V0H4.38v2.291H2.92C1.307 2.291.015 3.316.015 4.582L0 20.619c0 1.266 1.307 2.291 2.92 2.291h20.44c1.613 0 2.92-1.025 2.92-2.291V4.582c0-1.266-1.307-2.291-2.92-2.291H21.9V0h-2.92zm4.38 20.619H2.92v-12.6h20.44v12.6z"
        fill="#EBEBF5"
        fillOpacity={0.5}
      />
    </Svg>
  )
}

export default MoodGray
