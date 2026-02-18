// import Svg, { Path } from 'react-native-svg';
//
// import { MAIN_ICON_COLOR } from '@/src/constants/Colors';
// import { IconProps } from '@/src/components/icons/interfaces';
//
// const IconImageAdd = ({ color = MAIN_ICON_COLOR }: IconProps) => (
//   <Svg width="24" height="24" viewBox="0 0 48 48">
//     <Path
//       d="M6 42V6H29.45V9H9V39H39V18.6H42V42ZM35 17.1V13.05H30.95V10.05H35V6H38V10.05H42.05V13.05H38V17.1ZM12 33.9H36L28.8 24.3L22.45 32.65L17.75 26.45ZM9 20.1V39V9V17.1V20.1Z"
//       fill={color}
//     />
//   </Svg>
// );
//
// export default IconImageAdd;

import Svg, { Path } from 'react-native-svg';

import { MAIN_ICON_COLOR } from '@/src/constants/Colors';
import { IconProps } from '@/src/components/icons/interfaces';

const IconImagePlusLine = ({ color = MAIN_ICON_COLOR }: IconProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12v7a2 2 0 0 1-2 2h-3m5-9c-6.442 0-10.105 1.985-12.055 4.243M21 12v-1.5M3 16v3a2 2 0 0 0 2 2v0h11M3 16V5a2 2 0 0 1 2-2h8M3 16c1.403-.234 3.637-.293 5.945.243M16 21c-1.704-2.768-4.427-4.148-7.055-4.757M8.5 7C8 7 7 7.3 7 8.5S8 10 8.5 10 10 9.7 10 8.5 9 7 8.5 7zM19 2v3m0 3V5m0 0h3m-3 0h-3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default IconImagePlusLine;
