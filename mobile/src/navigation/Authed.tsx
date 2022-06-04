import React, { createContext } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { User } from 'firebase/auth';

import HomeScreen from '@screens/Home';

export type AuthedStackParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator();

interface AuthedProps {
  user: User;
}

export default function Authed({ user }: AuthedProps) {
  return (
    <AuthedUserContext.Provider value={user}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthedUserContext.Provider>
  );
}

export const AuthedUserContext = createContext<User>({} as User);
