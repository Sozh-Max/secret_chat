import { ReactNode } from 'react';
import { View, Text } from 'react-native';

import { styles } from '@/pages/SettingsPage/content/SettingsContent/style';

type SettingsContentProps = {
  title: string;
  description?: string | ReactNode;
  children?: ReactNode;
  contentTop?: boolean;
}

export const SettingsContent = ({
  title,
  description,
  contentTop = false,
  children,
}: SettingsContentProps) => {

  return (
    <View
      style={styles.wrapper}
    >
      <Text style={styles.title}>
        {title}
      </Text>
      <View
        style={{
          ...styles.container,
          flexDirection: contentTop ? 'column-reverse' : 'column',
        }}
      >
        {description && (
          <Text style={styles.description}>
            {description}
          </Text>
        )}
        {children}

      </View>
    </View>
  );
};