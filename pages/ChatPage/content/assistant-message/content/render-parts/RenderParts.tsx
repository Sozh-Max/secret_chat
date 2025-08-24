import { Text } from 'react-native';

import { ImageContent } from '@/pages/ChatPage/content/assistant-message/content/image-content/ImageContent';
import { VideoContent } from '@/pages/ChatPage/content/assistant-message/content/video-content/VideoContent';
import { styles } from '@/pages/ChatPage/content/assistant-message/content/render-parts/styles';

export const RenderParts = ({
  part,
  index,
  id,
}: {
  id: string;
  part: string;
  index: number;
}) => {

  const match = part.match(/{{2,3}(photo|video)_(\d+)}{2,3}/);

  if (!match) {
    return (
      <Text
        key={index}
        style={styles.content}
      >
        {part.trim()}
      </Text>
    );
  }

  const type = match[1];
  const num = match[2].padStart(2, "0");

  if (type === "photo") {

    return (
      <ImageContent
        id={id}
        num={num}
        index={index}
      />
    );
  }

  if (type === "video") {
    return (
      <VideoContent
        id={id}
        num={num}
        index={index}
      />
    );
  }

  return null;
}