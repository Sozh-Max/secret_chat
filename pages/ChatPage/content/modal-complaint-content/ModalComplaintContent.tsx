import { View } from 'react-native';

import { TemplateContent } from '@/components/TemplateContent/TemplateContent';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { styles } from '@/pages/ChatPage/content/modal-complaint-content/styles';

export const ModalComplaintContent = ({
  handleClose,
  handleApply,
}: {
  handleClose: () => void;
  handleApply: () => void;
}) => (
  <View>
    <TemplateContent
      title="Content Report"
      description="You can report any AI responses you find unethical. We'll look into it and take steps to ensure it doesn't happen again."
    >
      <View style={styles.btn_container}>
        <CustomButton
          text="Send for review"
          handlePress={handleApply}
        />
      </View>
      <View style={styles.btn_container}>
        <CustomButton
          text="Cancel"
          handlePress={handleClose}
        />
      </View>
    </TemplateContent>
  </View>
);
