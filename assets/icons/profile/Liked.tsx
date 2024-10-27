import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Liked = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#EEE"
      d="m25.337 20.331.882-5.1a2.083 2.083 0 0 0-2.05-2.438h-6.477c-.642 0-1.13-.576-1.027-1.21l.828-5.056a5.977 5.977 0 0 0-.112-2.468 2.043 2.043 0 0 0-1.366-1.42l-.18-.059c-.41-.131-.857-.1-1.243.085a1.58 1.58 0 0 0-.85 1.022l-.595 2.293a9.538 9.538 0 0 1-.82 2.098c-.52.972-1.322 1.75-2.156 2.47l-1.799 1.549a2.085 2.085 0 0 0-.715 1.758l1.015 11.741a2.082 2.082 0 0 0 2.073 1.904h5.81c4.352 0 8.066-3.032 8.782-7.169Z"
    />
    <Path
      fill="#BFC1C6"
      fillRule="evenodd"
      d="M3.71 11.856a.937.937 0 0 1 .974.856l1.215 14.046a1.546 1.546 0 1 1-3.087.133V12.793c0-.502.396-.915.898-.937Z"
      clipRule="evenodd"
      opacity={0.5}
    />
  </Svg>
)
export default Liked
