import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NotificationColor(props:any) {
  return (
    <Svg
      width={31}
      height={31}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.634 14.452l-1.173-1.921c-.246-.428-.47-1.238-.47-1.713V7.892c0-2.719-1.618-5.068-3.953-6.167C11.428.66 10.3 0 9.01 0a3.482 3.482 0 00-3.038 1.759C3.684 2.88 2.1 5.207 2.1 7.89v2.928c0 .474-.223 1.284-.47 1.7L.445 14.452c-.47.775-.575 1.631-.281 2.418.281.775.95 1.377 1.818 1.666a22.227 22.227 0 007.064 1.134c2.393 0 4.787-.37 7.063-1.122a2.797 2.797 0 001.76-1.678 2.716 2.716 0 00-.235-2.418z"
        fill="#F4B0B0"
      />
    </Svg>
  )
}

export default NotificationColor
