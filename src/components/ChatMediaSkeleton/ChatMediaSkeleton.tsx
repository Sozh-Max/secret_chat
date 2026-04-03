import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { EaseView } from 'react-native-ease';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const ChatMediaSkeleton = ({ style }: Props) => {
  return (
    <EaseView
      initialAnimate={{ opacity: 0.35 }}
      animate={{ opacity: 0.65 }}
      transition={{
        type: 'timing',
        duration: 700,
        easing: 'easeInOut',
        loop: 'reverse',
      }}
      style={[
        {
          backgroundColor: '#6A6A6A',
        },
        style,
      ]}
    />
  );
};