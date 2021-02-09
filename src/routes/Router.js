import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { useAuth } from '../contexts/AuthContext';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';

const Router = () => {
  const { signedIn, loading } = useAuth();
  const ref = useRef();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  });

  return (
    <NavigationContainer ref={ref}>
      {signedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Router;
