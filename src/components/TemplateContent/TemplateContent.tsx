import { ReactNode } from 'react';
import { View, Text } from 'react-native';

import { styles } from '@/src/components/TemplateContent/style';

type SettingsContentProps = {
  title: string;
  description?: string | ReactNode;
  children?: ReactNode;
  contentTop?: boolean;
}

export const TemplateContent = ({
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