import Svg, { Path } from 'react-native-svg';
import { SUB_COLOR } from '@/constants/Colors';

export const IconPlayShort = () => (
  <Svg width="18" height="18" viewBox="0 -960 960 960">
    <Path
      d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
      fill={SUB_COLOR}
    />
  </Svg>
)