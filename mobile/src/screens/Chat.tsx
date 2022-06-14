import React, { useContext } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';
import { Button, Text, View } from 'react-native';

import { isError, isLoading, isNotAsked } from '@utils/remoteData';

import { UsersDocument, UsersQuery } from '@graphql/generated';
import useRemoteDataQuery from '@hooks/useRemoteDataQuery';

import { AuthedUserContext } from '@navigation/Authed';
import { CommunityContext, TabsParamList } from '@navigation/Authed/Community';

const auth = getAuth();

export default function Chat(_props: NativeStackScreenProps<TabsParamList, 'Events'>) {
  const user = useContext(AuthedUserContext);
  const community = useContext(CommunityContext);

  const { remoteData } = useRemoteDataQuery<UsersQuery>(UsersDocument);

  if (isLoading(remoteData) || isNotAsked(remoteData)) {
    return <Text>Loading</Text>;
  }

  if (isError(remoteData)) {
    return (
      <View>
        <Text>Error: {remoteData.error.message ?? 'Unknown'}</Text>
        <Button title="Sign out" onPress={() => signOut(auth)} />
      </View>
    );
  }

  return (
    <View>
      <Text>
        Hi {user.email}. Welcome to {community.name}
      </Text>
    </View>
  );
}
