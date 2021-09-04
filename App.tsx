import React from 'react';

import AppLoading from 'expo-app-loading';

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
    <Container>

    </Container>
  );
}

export { App };