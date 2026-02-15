import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageResult } from 'expo-image-manipulator';

const MAX_SIDE = 720;

export const compressPicture = async (
  asset: ImagePicker.ImagePickerAsset,
  size: number,
): Promise<ImageResult> => {

  const maxSize = size || MAX_SIDE

  const w = asset.width ?? 0;
  const h = asset.height ?? 0;
  //if (!w || !h) return { uri: asset.uri };

  const scale = maxSize / Math.max(w, h);

  if (scale >= 1) return { uri: asset.uri, width: w, height: h };

  const newW = Math.round(w * scale);
  const newH = Math.round(h * scale);

  const result: ImageResult = await ImageManipulator.manipulateAsync(
    asset.uri,
    [{ resize: { width: newW, height: newH } }],
    {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  return result;
}