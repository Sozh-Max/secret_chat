import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function Settings() {

  return (
    <LinearGradient
      colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.wrapper}
    >
      <View>
        <ThemedText>4444</ThemedText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    height: '100%',
  },
});

