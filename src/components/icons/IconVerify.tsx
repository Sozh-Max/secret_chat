import React, { useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/src/components/icons/interfaces';

type Props = IconProps & {
  size?: number;
  strokeWidth?: number;   // толщина контура бейджа
  checkWidth?: number;    // толщина галочки
  waves?: number;         // “зубчиков” (обычно 12)
  amplitude?: number;     // глубина волны
};

function makeScallopedCirclePath({
  cx,
  cy,
  r,
  waves,
  amplitude,
  rotationDeg,
}: {
  cx: number;
  cy: number;
  r: number;
  waves: number;
  amplitude: number;
  rotationDeg: number;
}) {
  const rot = (rotationDeg * Math.PI) / 180;

  // Делаем волнистый круг через квадратичные кривые:
  // точка на "гребне" -> контрольная точка -> следующая точка на "впадине" и так по кругу
  const pts = [];
  const total = waves * 2; // чередуем наружу/внутрь
  for (let i = 0; i < total; i++) {
    const t = (i / total) * Math.PI * 2 + rot;
    const rr = i % 2 === 0 ? r + amplitude : r - amplitude;
    pts.push([cx + rr * Math.cos(t), cy + rr * Math.sin(t)]);
  }

  let d = `M ${pts[0][0].toFixed(3)} ${pts[0][1].toFixed(3)}`;

  // Для каждого сегмента используем control point на среднем угле с базовым радиусом r
  for (let i = 0; i < total; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % total];

    // средний угол между i и i+1
    const a0 = (i / total) * Math.PI * 2 + rot;
    const a1 = ((i + 1) / total) * Math.PI * 2 + rot;
    const am = (a0 + a1) / 2;

    const cxm = cx + r * Math.cos(am);
    const cym = cy + r * Math.sin(am);

    d += ` Q ${cxm.toFixed(3)} ${cym.toFixed(3)} ${p1[0].toFixed(3)} ${p1[1].toFixed(3)}`;
  }

  d += ' Z';
  return d;
}

const IconVerifiedOutline = ({
  color = '#6D28D9',
  size = 24,
  strokeWidth = 1.7,  // тоньше
  checkWidth = 2.0,   // чуть толще контура, но не жирно
  waves = 12,
  amplitude = 1.05,   // аккуратная “волна”
}: Props) => {
  const badgePath = useMemo(
    () =>
      makeScallopedCirclePath({
        cx: 12,
        cy: 12,
        r: 9.1,          // правильнее по “воздуху” внутри
        waves,
        amplitude,
        rotationDeg: -90, // ровно сверху “гребень”
      }),
    [waves, amplitude]
  );

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Волнистый бейдж (контур) */}
      <Path
        d={badgePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />

      {/* Галочка (чуть компактнее и по центру) */}
      <Path
        d="M 8.70 12.35 L 10.65 14.30 L 15.55 9.55"
        fill="none"
        stroke={color}
        strokeWidth={checkWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconVerifiedOutline;
