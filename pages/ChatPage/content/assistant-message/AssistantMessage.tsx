import { View, Text } from 'react-native';

import { IDialogItem } from '@/contexts/GlobalContext';
import { IconResponse } from '@/components/icons/IconResponse';
import { AGENT_KEYS } from '@/constants/agents-data';
import { styles } from '@/pages/ChatPage/content/assistant-message/styles';
import { RenderParts } from '@/pages/ChatPage/content/assistant-message/content/render-parts/RenderParts';

import { MAIN_COLOR } from '@/constants/Colors';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { useComplaint } from '@/contexts/ComplaintContext';
import { IconComplaintFlag } from '@/components/icons/IconComplaintFlag';

export const AssistantMessage = ({
  dialog,
  id,
}: {
  dialog: IDialogItem;
  id: AGENT_KEYS;
}) => {
  const { activateComplaint } = useComplaint();

  const content = dialog.replic.content || '';

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_content}>
            <IconResponse/>
            <Text style={styles.name}>{id}</Text>
            <Text style={styles.time}>{dialog.create}</Text>
          </View>
          <AnimatedPressBtn
            style={styles.button_complaint}
            onPress={() => activateComplaint(id)}
          >
            <IconComplaintFlag color={MAIN_COLOR}/>
          </AnimatedPressBtn>
        </View>
        <View style={{ gap: 4, flexWrap: 'wrap' }}>
          <RenderParts
            part={content}
            id={id}
          />
        </View>
      </View>
    </View>
  );
};