import Svg, { Path } from 'react-native-svg';

import { MAIN_ICON_COLOR } from '@/src/constants/Colors';
import { IconProps } from '@/src/components/icons/interfaces';

const IconImagePlusLine = ({
  color = MAIN_ICON_COLOR,
}: IconProps) => (
  <Svg height={24} viewBox="0 -960 960 960" width={24} fill={color}>
    <Path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
  </Svg>
);

export default IconImagePlusLine;
