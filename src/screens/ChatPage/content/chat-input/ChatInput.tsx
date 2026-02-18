import { Pressable, TextInput, View, Image } from 'react-native';
import IconSend from '@/src/components/icons/IconSend';
import IconImage from '@/src/components/icons/IconImage';
import { useEffect, useState } from 'react';
import { MAIN_ICON_COLOR, DISMISS_ICON_COLOR, SUB_MAIN_ICON_COLOR } from '@/src/constants/Colors';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { IdTypeProps } from '@/src/interfaces/global';
import { useGlobal } from '@/src/contexts/GlobalContext';
import { styles } from '@/src/screens/ChatPage/content/chat-input/styles';
import { useUser } from '@/src/contexts/UserContext';
import { CLEAR_HISTORY_SYMBOLS } from '@/src/constants/global';
import { useApi } from '@/src/contexts/ApiContext';
import { pickImage } from '@/src/utils/pick-image';
import IconCloseCircle from '@/src/components/icons/IconCloseCircle';

interface ChatInputProps extends IdTypeProps {
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const transformUploadedSize = (w: number, h: number, size = 40) => {
  const def = { width: size, height: size };

  if (!w || !h) return def;

  const ratio = w / h;

  if (ratio > 1) {
    return { width: size, height: size / ratio };
  }

  if (ratio < 1) {
    return { width: size * ratio, height: size };
  }

  return def;
};

const ChatInput = ({
  id,
  setLoading,
  loading,
}: ChatInputProps) => {
  const [text, setText] = useState<string>('');
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const [localPreviewUri, setLocalPreviewUri] = useState<string | null>(null);
  const { dialogs, setDialogs, tokens, updateBalance, setLastMsgGlobalId } = useGlobal();
  const { userId, logout } = useUser();
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const { messageService } = useApi();
  const dialog = dialogs[id];
  const { api } = useApi();

  const isBlocked = dialog?.isBlocked || dialog?.isComplaint;
  const globalLoading = loading || loadingImage;


  const selectPicture = async () => {
    if (isBlocked || globalLoading) return;
    try {
      const asset = await pickImage();
      if (asset) {
        setLoadingImage(true);
        setLocalPreviewUri(asset.uri)
        // setUploadImageSizes({
        //   width: asset.width || 0,
        //   height: asset.height || 0,
        // })
        const { data } = await api.uploadPicture({ userId: userId, fileUri: asset.uri });
        if (data.url) {
          setUploadUrl(data.url);
        }
      }
    } catch(e) {
      console.log(e);
      clearUploadedImage();
    } finally {
      setLoadingImage(false);
    }
  }


  const sendMessage = async () => {
    if (tokens - (dialog?.cost || 0) < 0) {
      alert("You haven't tokens!");
      return;
    }

    if (!isBlocked && !globalLoading && text.trim()) {
      setText('');
      clearUploadedImage();
      updateBalance(-(dialog?.cost || 0));

      await messageService.sendMessage({
        id,
        userId,
        message: text.trim(),
        setDialogs,
        assistantDialog: dialog?.dialog || [],
        setLoading,
        setLastMsgGlobalId,
        image: uploadUrl || null,
      });
    }

    if (text.trim() === CLEAR_HISTORY_SYMBOLS) {
      logout();
    }
  };

  useEffect(() => {
    if (isBlocked || loading) {
      setText('');
    }
  }, [
    isBlocked,
    loading,
  ]);

  const clearUploadedImage = () => {
    setLocalPreviewUri(null);
    setUploadUrl(null);
  }

  // const previewUri = uploadUrl || localPreviewUri;
  const previewUri = localPreviewUri;

  //const { width: imgW, height: imgH } = transformUploadedSize(uploadImageSizes.width, uploadImageSizes.height);

  return (
    <View style={styles.container}>
      {previewUri ? (
        <View
          style={styles.uploadedImageWrapper}
        >
          <View style={styles.uploadedImageContainer}>
            <Pressable
              style={styles.uploadedImageRemove}
              onPress={clearUploadedImage}
            >
              <IconCloseCircle size={16} />
            </Pressable>
            <Image
              source={{ uri: previewUri as string }}
              style={styles.uploadedImage}
              resizeMode="cover"
            />
          </View>

        </View>
      ) : (
        <AnimatedPressBtn
          style={[styles.button, styles.button_start]}
          onPress={selectPicture}
          disabled={!dialog?.verified}
        >
          <IconImage color={(isBlocked || !dialog?.verified) ? DISMISS_ICON_COLOR : MAIN_ICON_COLOR} />
        </AnimatedPressBtn>
      )}

      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        placeholderTextColor={isBlocked ? DISMISS_ICON_COLOR : MAIN_ICON_COLOR}
        selectionColor={MAIN_ICON_COLOR}
        underlineColorAndroid="transparent"
        value={text}
        onChangeText={setText}
        onSubmitEditing={sendMessage}
        returnKeyType="send"
        blurOnSubmit={false}
        cursorColor={MAIN_ICON_COLOR}
        editable={!isBlocked}
        onBlur={() => setIsInputFocused(false)}
        onFocus={() => setIsInputFocused(true)}
      />

      <Pressable style={[styles.button, styles.button_finish]} onPress={sendMessage}>
        <IconSend
          color={(isBlocked || globalLoading || !text) ? DISMISS_ICON_COLOR : isInputFocused ? SUB_MAIN_ICON_COLOR : MAIN_ICON_COLOR}
        />
      </Pressable>
    </View>
  );
};

export default ChatInput;