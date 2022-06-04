import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '@screens/Welcome';
import LogIn from '@screens/Login';
import SignUp from '@screens/SignUp';

export type UnAuthedStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<UnAuthedStackParamList>();

export default function UnAuthedStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Create an account' }} />
        <Stack.Screen name="Login" component={LogIn} options={{ title: 'Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
