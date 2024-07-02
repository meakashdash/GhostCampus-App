import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ProfileGray(props:any) {
  return (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.92 19.669h14.214c1.2 0 1.917-.57 1.917-1.514 0-2.748-3.485-6.528-9.03-6.528-5.534 0-9.021 3.78-9.021 6.528 0 .945.718 1.514 1.92 1.514zm7.11-9.94c2.328 0 4.31-2.07 4.31-4.746 0-2.627-1.988-4.627-4.31-4.627-2.323 0-4.312 2.037-4.308 4.646C4.724 7.66 6.694 9.73 9.03 9.73z"
        fill="#EBEBF5"
        fillOpacity={0.6}
      />
    </Svg>
  )
}

export default ProfileGray
