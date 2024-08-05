import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Liked = (props:any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Rect width={40} height={40} fill="#0F172A" fillOpacity={0.08} rx={16} />
    <Path
      fill="#EF4444"
      d="M12.4 9.25c-2.78 0-5.15 2.08-5.15 4.78 0 1.863.872 3.431 2.028 4.73 1.153 1.295 2.64 2.382 3.983 3.292l2.319 1.57a.75.75 0 0 0 .84 0l2.319-1.57c1.344-.91 2.83-1.997 3.982-3.292 1.157-1.299 2.029-2.867 2.029-4.73 0-2.7-2.37-4.78-5.15-4.78-1.434 0-2.695.672-3.6 1.542-.905-.87-2.166-1.542-3.6-1.542Z"
    />
  </Svg>
)
export default Liked
