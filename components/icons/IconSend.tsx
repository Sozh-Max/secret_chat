import Svg, { Path } from 'react-native-svg';

import { MAIN_ICON_COLOR } from '@/constants/Colors';
import { IconProps } from '@/components/icons/interfaces';

const IconSend = ({
  color = MAIN_ICON_COLOR,
}: IconProps) => (
  <Svg width="24" height="24" viewBox="0 -960 960 960">
    <Path
      d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
      fill={color}
    />
  </Svg>
);

export default IconSend;
