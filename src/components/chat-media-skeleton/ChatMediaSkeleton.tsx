import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { EaseView } from 'react-native-ease';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const ChatMediaSkeleton = ({ style }: Props) => {
  return (
    <EaseView
      initialAnimate={{ backgroundColor: '#1e1e1e' }}
      animate={{ backgroundColor: '#373737' }}
      transition={{
        type: 'timing',
        duration: 700,
        easing: 'easeInOut',
        loop: 'reverse',
      }}
      style={style}
    />
  );
};