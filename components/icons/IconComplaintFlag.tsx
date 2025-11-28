import { MAIN_ICON_COLOR } from '@/constants/Colors';
import { IconProps } from '@/components/icons/interfaces';
import Svg, { Path } from 'react-native-svg';

export const IconComplaintFlag = ({
  color = MAIN_ICON_COLOR,
}: IconProps) => (
  <Svg
    height={24}
    width={24}
    viewBox="0 -960 960 960"
    fill={color}
  >
    <Path
      d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z"
    />
  </Svg>
);