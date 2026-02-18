import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { IDialogItem } from '@/src/contexts/GlobalContext';
import { styles } from '@/src/screens/ChatPage/content/user-message/styles';
import { IconResponse } from '@/src/components/icons/IconResponse';
import { getHoursAndMinutesFromMs } from '@/src/services/message-service';
import { router } from 'expo-router';

export const UserMessage = ({ dialog }: { dialog: IDialogItem }) => {
  const url = dialog.replic.image;

  const [imgRatio, setImgRatio] = useState<number | null>(null); // width/height

  useEffect(() => {
    if (!url) return;

    Image.getSize(
      url,
      (w, h) => {
        if (w > 0 && h > 0) setImgRatio(w / h);
      },
      () => {
        setImgRatio(null);
      }
    );
  }, [url]);

  const imageStyle = useMemo(() => {
    if (!imgRatio) return [styles.image, { width: '100%', height: 220 }];

    return [styles.image, { width: '100%', aspectRatio: imgRatio }];
  }, [imgRatio]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>You</Text>
          <Text style={styles.time}>{getHoursAndMinutesFromMs(dialog.createTime)}</Text>
          <View style={styles.iconWrap}>
            <IconResponse />
          </View>
        </View>

        {url && (
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/image-modal',
                params: { url },
              })
            }
            style={styles.imagePressable}
          >
            <Image
              source={{ uri: url }}
              // @ts-ignore
              style={imageStyle}
              resizeMode="contain"
            />
          </Pressable>
        )}

        <Text style={styles.content}>{dialog.replic.content}</Text>
      </View>
    </View>
  );
};
