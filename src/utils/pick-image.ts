import * as ImagePicker from 'expo-image-picker';
import { compressPicture } from '@/src/utils/compress-picture';

export const pickImage = async () => {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) {
    alert('No permission to access photos');
    return;
  }

  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 1,
  });

  if (res.canceled) return;

  const asset = res.assets[0];

  const compressed = await compressPicture(asset, 720);

  // тут дальше ты решаешь что делать:
  // 1) сразу загрузить на бэк
  // await userService.uploadPicture({ userId, fileUri: asset.uri })
  //
  // 2) или отправить как сообщение-картинку через messageService
  // await messageService.sendImage({ id, userId, uri: asset.uri, setDialogs, setLoading, setLastMsgGlobalId })

  return { ...asset, uri: compressed.uri, width: compressed.width, height: compressed.height };
};