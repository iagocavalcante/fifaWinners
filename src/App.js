import React from 'react';
import { AuthContextProvider } from './contexts/AuthContext';
import Router from './routes/Router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
export default () => (
  <SafeAreaProvider>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </SafeAreaProvider>
);
