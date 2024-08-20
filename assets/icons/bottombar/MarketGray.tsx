import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MarketGray(props:any) {
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
      d="M5.25 7.5v-.75a6.75 6.75 0 0 1 13.5 0v.75h3.75c.828 0 1.5.674 1.5 1.51v18.002A2.992 2.992 0 0 1 21.009 30H2.991A2.99 2.99 0 0 1 0 27.012v-18C0 8.175.667 7.5 1.5 7.5h3.75Zm2.25 0h9v-.75a4.5 4.5 0 1 0-9 0v.75Zm-2.25 0v6H7.5v-6H5.25Zm11.25 0v6h2.25v-6H16.5Z"
      fill="#EBEBF5"
        fillOpacity={0.5}
      />
    </Svg>
  )
}

export default MarketGray
