import Svg, { Path } from 'react-native-svg';

import { MAIN_ICON_COLOR } from '@/src/constants/Colors';
import { IconProps } from '@/src/components/icons/interfaces';

const IconImage = ({ color = MAIN_ICON_COLOR }: IconProps) => (
  <Svg width="24" height="24" viewBox="0 -960 960 960">
    <Path
      d="M200-160q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720v480q0 33-23.5 56.5T760-160H200Zm0-80h560v-480H200v480Zm60-80h440L560-500 450-350l-70-90-120 160Zm90-240q29 0 49.5-20.5T420-630q0-29-20.5-49.5T350-700q-29 0-49.5 20.5T280-630q0 29 20.5 49.5T350-560Z"
      fill={color}
    />
  </Svg>
);

export default IconImage;