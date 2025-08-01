import Svg, { Polygon } from 'react-native-svg';
import { MAIN_COLOR } from '@/constants/Colors';

export const IconRating = () => (
  <Svg
    fill="none"
    height="17"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="17"
  >
    <Polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill={MAIN_COLOR}
    />
  </Svg>
);