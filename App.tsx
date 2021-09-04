import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/global/theme';
import AppLoading from 'expo-app-loading';

import { Dashboard } from './src/screens/Dashboard';

import {
  useFonts,
  IBMPlexSans_400Regular,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_500Medium,
  IBMPlexSans_700Bold,
} from '@expo-google-fonts/ibm-plex-sans';

function App() {
  const [fontLoading] = useFonts({
    IBMPlexSans_600SemiBold,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_700Bold,
  });

  if (!fontLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export { App };