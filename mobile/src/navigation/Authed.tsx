import React, { createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from 'firebase/auth';

import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

interface AuthedProps {
  user: User;
}

export default function Authed({ user }: AuthedProps) {
  return (
    <AuthedUserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthedUserContext.Provider>
  );
}

export const AuthedUserContext = createContext<User>({} as User);
