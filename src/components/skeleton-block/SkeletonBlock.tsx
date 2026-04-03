import { StyleProp, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { ChatMediaSkeleton } from '@/src/components/ChatMediaSkeleton/ChatMediaSkeleton';
import { Image, ImageContentFit, ImageStyle } from 'expo-image';

type SkeletonBlockProps = {
  url: string;
  containerStyle?: StyleProp<ViewStyle>;
  skeletonStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk' | null;
  handleError?: (value: boolean) => void;
};

export const SkeletonBlock = ({
  url,
  containerStyle,
  skeletonStyle,
  imageStyle,
  contentFit,
  cachePolicy = 'disk',
  handleError,
}: SkeletonBlockProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const setError = (value: boolean) => {
    setHasError(value);
    handleError?.(value);
  };

  return (
    <View style={[{ position: 'relative' }, containerStyle]}>
      {!isLoaded && (
        <ChatMediaSkeleton
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
            },
            skeletonStyle,
          ]}
        />
      )}

      {!hasError && (
        <Image
          source={url}
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
            },
            imageStyle,
          ]}
          cachePolicy={cachePolicy}
          contentFit={contentFit}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
};