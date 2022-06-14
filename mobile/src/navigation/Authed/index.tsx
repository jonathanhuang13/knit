import React, { createContext } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { Button, Spinner, Text } from 'native-base';
import { OverlayProvider } from 'stream-chat-expo';

import { isError, isLoading, isNotAsked } from '@utils/remoteData';

import {
  AuthHomeDocument,
  AuthHomeQuery,
  AuthHomeQueryVariables,
  CommunityBasicsFragment,
  UserBasicsFragment,
} from '@graphql/generated';
import useRemoteDataQuery from '@hooks/useRemoteDataQuery';

import Sidebar from '@components/Sidebar';

import Community from './Community';

export type AuthedStackParamList = {
  Community: { community: CommunityBasicsFragment };
};

const Drawer = createDrawerNavigator<AuthedStackParamList>();

interface AuthedProps {
  email: string;
}

const auth = getAuth();

export default function Authed({ email }: AuthedProps) {
  const { remoteData } = useRemoteDataQuery<AuthHomeQuery, AuthHomeQueryVariables>(AuthHomeDocument, {
    variables: { email },
  });

  if (isError(remoteData)) {
    return <Text>Error: {remoteData.error?.message}</Text>;
  }
  if (isLoading(remoteData) || isNotAsked(remoteData) || !remoteData.data.userByEmail) return <Spinner />;

  const adminCommunities = remoteData.data.userByEmail.adminCommunities ?? [];
  const memberCommunities = remoteData.data.userByEmail.memberCommunities ?? [];
  const hasNoCommunities = adminCommunities.length === 0 && memberCommunities.length === 0;

  return (
    <AuthedUserContext.Provider value={remoteData.data.userByEmail}>
      {hasNoCommunities ? (
        <Button onPress={() => signOut(auth)}>Sign out</Button>
      ) : (
        <OverlayProvider>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Community"
              screenOptions={{ headerShown: false }}
              drawerContent={(props) => (
                <Sidebar
                  adminCommunities={adminCommunities}
                  memberCommunities={memberCommunities}
                  {...props}
                />
              )}
            >
              <Drawer.Screen
                name="Community"
                component={Community}
                initialParams={{ community: adminCommunities[0] ?? memberCommunities[0] }}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </OverlayProvider>
      )}
    </AuthedUserContext.Provider>
  );
}

export const AuthedUserContext = createContext<UserBasicsFragment>({} as UserBasicsFragment);
