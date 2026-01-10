import { View, Text } from 'react-native';

import { IDialogItem, useGlobal } from '@/src/contexts/GlobalContext';
import { IconResponse } from '@/src/components/icons/IconResponse';
import { AGENT_KEYS } from '@/src/constants/agents-data';
import { styles } from '@/src/screens/ChatPage/content/assistant-message/styles';
import { RenderParts } from '@/src/screens/ChatPage/content/assistant-message/content/render-parts/RenderParts';

import { DISMISS_ICON_COLOR, MAIN_ICON_COLOR } from '@/src/constants/Colors';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { useComplaint } from '@/src/contexts/ComplaintContext';
import { IconComplaintFlag } from '@/src/components/icons/IconComplaintFlag';
import { getHoursAndMinutesFromMs } from '@/src/services/message-service';

export const AssistantMessage = ({
  dialog,
  id,
}: {
  dialog: IDialogItem;
  id: AGENT_KEYS;
}) => {
  const { activateComplaint } = useComplaint();
  const { dialogs } = useGlobal();

  const content = dialog.replic.content || '';
  const userDialog = dialogs[id];

  const handlePressComplaint = () => {
    if (!userDialog?.isComplaint) {
      activateComplaint(id);
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_content}>
            <IconResponse/>
            <Text style={styles.name}>{id}</Text>
            <Text style={styles.time}>{getHoursAndMinutesFromMs(dialog.createTime)}</Text>
          </View>
          <AnimatedPressBtn
            style={styles.button_complaint}
            onPress={handlePressComplaint}
          >
            <IconComplaintFlag
              color={(userDialog?.isComplaint || userDialog?.isBlocked) ? DISMISS_ICON_COLOR : MAIN_ICON_COLOR}
            />
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