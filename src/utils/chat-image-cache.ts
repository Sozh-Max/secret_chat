import Constants from 'expo-constants';
import { Image } from 'expo-image';

import { AGENT_KEYS } from '@/src/constants/agents-data';
import { IDialogItem } from '@/src/contexts/GlobalContext';

const STORAGE_URL = Constants.expoConfig?.extra?.STORAGE_URL;

const PHOTO_TOKEN_REGEXP = /{{2,3}photo_(\d+)}{2,3}/g;
const VIDEO_TOKEN_REGEXP = /{{2,3}video_(\d+)}{2,3}/g;

const padMediaNum = (num: string) => num.padStart(2, '0');

export const getAgentPhotoUrl = (id: AGENT_KEYS, num: string) =>
  STORAGE_URL ? `${STORAGE_URL}/${id}/photo/${padMediaNum(num)}.jpg` : '';

export const getAgentVideoPosterUrl = (id: AGENT_KEYS, num: string) =>
  STORAGE_URL ? `${STORAGE_URL}/${id}/video/posters/${padMediaNum(num)}.jpg` : '';

export const collectDialogImageUrls = (dialog: IDialogItem[], id: AGENT_KEYS) => {
  const urls = new Set<string>();

  dialog.forEach((item) => {
    if (item.replic.image) {
      urls.add(item.replic.image);
    }

    const photoMatches = item.replic.content.matchAll(PHOTO_TOKEN_REGEXP);
    for (const match of photoMatches) {
      const url = getAgentPhotoUrl(id, match[1]);
      if (url) {
        urls.add(url);
      }
    }

    const videoMatches = item.replic.content.matchAll(VIDEO_TOKEN_REGEXP);
    for (const match of videoMatches) {
      const url = getAgentVideoPosterUrl(id, match[1]);
      if (url) {
        urls.add(url);
      }
    }
  });

  return Array.from(urls);
};

export const prefetchChatImages = async (urls: string[]) => {
  await Promise.allSettled(
    urls.filter(Boolean).map((url) => Image.prefetch(url, 'disk'))
  );
};
