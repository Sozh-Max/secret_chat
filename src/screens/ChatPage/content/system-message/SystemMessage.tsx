import { View, Text, Pressable } from 'react-native';

import { styles } from '@/src/screens/ChatPage/content/system-message/styles';
import { IconSystem } from '@/src/components/icons/IconSystem';
import { router } from 'expo-router';
import { IdTypeProps } from '@/src/interfaces/global';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { SkeletonBlock } from '@/src/components/skeleton-block/SkeletonBlock';

interface SystemMessageType extends IdTypeProps {
  message?: string;
  isImage?: boolean;
}

const STORAGE_URL = Constants.expoConfig?.extra?.STORAGE_URL;

export const SystemMessage = ({
  id,
  message,
  isImage = false,
}: SystemMessageType) => {
  const [hasImageError, setHasImageError] = useState(false);

  const handlePress = () => {
    if (!hasImageError) {
      router.push({
        pathname: '/image-modal',
        params: { sourceId: id },
      })
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <View style={styles.header}>
          <IconSystem/>
          <Text style={styles.title}>System</Text>
        </View>
        {Boolean(message) && (
          <Text style={styles.text}>
            {message}
          </Text>
        )}

        {isImage && (
          <Pressable
            onPress={handlePress}
          >
            <SkeletonBlock
              url={`${STORAGE_URL}/${id}/preview.jpg`}
              containerStyle={styles.img}
              skeletonStyle={styles.img}
              imageStyle={styles.img}
              handleError={setHasImageError}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};