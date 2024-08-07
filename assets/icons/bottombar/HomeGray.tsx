import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeGray(props:any) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.058 5.62L14.338.92c-1.831-1.283-4.643-1.213-6.405.152L2.088 5.632C.922 6.542 0 8.41 0 9.88v8.05c0 2.975 2.415 5.402 5.39 5.402h12.577a5.392 5.392 0 005.39-5.39v-7.91c0-1.575-1.015-3.512-2.299-4.41zm-8.505 13.044a.881.881 0 01-.875.875.881.881 0 01-.875-.875v-3.5c0-.478.397-.875.875-.875.479 0 .875.397.875.875v3.5z"
        fill="#EBEBF5"
        fillOpacity={0.5}
      />
    </Svg>
  )
}

export default HomeGray
