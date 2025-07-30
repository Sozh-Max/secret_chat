import { ReactNode } from 'react';
import { View, Text } from 'react-native';

import { styles } from '@/containers/SettingsContainer/content/SettingsContent/style';

type SettingsContentProps = {
  title: string;
  description?: string | ReactNode;
  children?: ReactNode;
}

export const SettingsContent = ({
  title,
  description,
  children,
}: SettingsContentProps) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
      {children}
    </View>
  )
};