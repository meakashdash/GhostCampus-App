import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function AddGray(props:any) {
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
          d="M20.5 39C30.718 39 39 30.718 39 20.5 39 10.283 30.718 2 20.5 2 10.283 2 2 10.283 2 20.5 2 30.718 10.283 39 20.5 39z"
          fill="#fff"
          stroke="#fff"
          strokeWidth={3.7}
          strokeLinejoin="round"
        />
        <Path
          d="M20.5 13.1v14.8m-7.4-7.4h14.8"
          stroke="#000"
          strokeWidth={3.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Mask>
      <G mask="url(#a)">
        <Path d="M-1.7-1.7h44.4v44.4H-1.7V-1.7z" fill="#88888D" />
      </G>
    </Svg>
  )
}

export default AddGray
