import Svg, { Path } from 'react-native-svg';

import { MAIN_COLOR } from '@/constants/Colors';

const IconSend = () => (
  <Svg width="24" height="24" viewBox="0 -960 960 960">
    <Path
      d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
      fill={MAIN_COLOR}
    />
  </Svg>
);

export default IconSend;
