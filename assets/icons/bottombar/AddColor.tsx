import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function AddColor(props:any) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        style={{
          maskType: "luminance"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={41}
        height={41}
      >
        <Path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M17 32c8.285 0 15-6.715 15-15 0-8.284-6.715-15-15-15C8.716 2 2 8.716 2 17c0 8.285 6.716 15 15 15Z"
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M17 11v12m-6-6h12"
      />
      </Mask>
      <G mask="url(#a)">
        <Path d="M-1.7-1.7h44.4v44.4H-1.7V-1.7z" fill="#F4B0B0" />
      </G>
    </Svg>
  )
}

export default AddColor
