import { View } from 'react-native';
import { TemplateContent } from '@/components/TemplateContent/TemplateContent';

import { CustomButton } from '@/components/CustomButton/CustomButton';
import { styles } from '@/pages/ChatPage/content/ModalBottomContent/styles';

export const ModalBottomContent = ({
  handleCancel
}: {
  handleCancel: () => void;
}) => {

  const handlePress = () => {

  }

  return (
    <View>
      <TemplateContent
        title='Content Report'
        description="You can report any AI responses you find unethical. We'll look into it and take steps to ensure it doesn't happen again."
      >
        <View style={styles.btn_container}>
          <CustomButton
            text="Send for review"
            handlePress={handlePress}
          />
        </View>
        <View style={styles.btn_container}>
          <CustomButton
            text="Cancel"
            handlePress={handleCancel}
          />
        </View>
      </TemplateContent>
    </View>
  )
}