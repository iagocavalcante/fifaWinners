import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { colors } from '../utils/colors';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <>
    <StatusBar backgroundColor={colors.primary} />
    <AuthStack.Navigator animationEnabled={false}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </AuthStack.Navigator>
  </>
);

export default AuthRoutes;
