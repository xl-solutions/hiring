import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { isReadyRef, navigationRef } from '../services/RootNavigation';

export function Routes() {
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <AppRoutes />
    </NavigationContainer>
  );
}
