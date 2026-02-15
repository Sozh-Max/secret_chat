import Svg, { Circle, Line } from 'react-native-svg';

import { MAIN_ERROR_COLOR } from '@/src/constants/Colors';
import { IconProps } from '@/src/components/icons/interfaces';

const IconCloseCircle = ({
  color = MAIN_ERROR_COLOR,
  size = 24,
  strokeColor = '#FFFFFF',
}: IconProps & { size?: number; strokeColor?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Line
      x1="8" y1="8" x2="16" y2="16"
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Line
      x1="16" y1="8" x2="8" y2="16"
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

export default IconCloseCircle;
