import { MAIN_ICON_COLOR, SUB_MAIN_ICON_COLOR } from '@/constants/Colors';
import Svg, { Path } from 'react-native-svg';

export const IconBackBtn = ({
  color = SUB_MAIN_ICON_COLOR,
}: {
  color?: string;
}) => (
  <Svg width="24" height="24" viewBox="0 -960 960 960">
    <Path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" fill={color} />
  </Svg>
)