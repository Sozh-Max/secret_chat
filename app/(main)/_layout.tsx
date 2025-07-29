import { Stack } from 'expo-router';
import React from 'react';

// Если вы всё равно хотите использовать Stack навигацию:
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}></Stack>
  );
}
