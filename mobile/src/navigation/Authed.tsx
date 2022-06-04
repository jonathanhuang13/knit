import React, { createContext } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { User, getAuth, signOut } from 'firebase/auth';
import { Button, Spinner, Text } from 'native-base';

import { isError, isLoading, isNotAsked } from '@utils/remoteData';

import {
  AuthHomeDocument,
  AuthHomeQuery,
  AuthHomeQueryVariables,
  SidebarCommunityFragment,
} from '@graphql/generated';
import useRemoteDataQuery from '@hooks/useRemoteDataQuery';

import HomeScreen from '@screens/Home';

import Sidebar from '@components/Sidebar';

export type AuthedStackParamList = {
  Home: { community: SidebarCommunityFragment };
};

const Drawer = createDrawerNavigator<AuthedStackParamList>();

interface AuthedProps {
  user: User;
  email: string;
}

const auth = getAuth();

export default function Authed({ user, email }: AuthedProps) {
  const { remoteData } = useRemoteDataQuery<AuthHomeQuery, AuthHomeQueryVariables>(AuthHomeDocument, {
    variables: { email },
  });

  if (isLoading(remoteData) || isNotAsked(remoteData)) return <Spinner />;
  if (isError(remoteData)) return <Text>Error: {remoteData.error.message}</Text>;

  const adminCommunities = remoteData.data.userByEmail?.adminCommunities ?? [];
  const memberCommunities = remoteData.data.userByEmail?.memberCommunities ?? [];
  const hasNoCommunities = adminCommunities.length === 0 && memberCommunities.length === 0;

  return (
    <AuthedUserContext.Provider value={{ ...user, email }}>
      {hasNoCommunities ? (
        <Button onPress={() => signOut(auth)}>Sign out</Button>
      ) : (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => (
              <Sidebar adminCommunities={adminCommunities} memberCommunities={memberCommunities} {...props} />
            )}
          >
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{ community: adminCommunities[0] ?? memberCommunities[0] }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </AuthedUserContext.Provider>
  );
}

interface AuthedUser extends User {
  email: string;
}

export const AuthedUserContext = createContext<AuthedUser>({} as AuthedUser);
