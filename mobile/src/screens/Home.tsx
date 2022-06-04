import React, { useContext } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';
import { Button, FlatList, Text, View } from 'react-native';

import { isError, isLoading, isNotAsked } from '@utils/remoteData';

import { UsersDocument, UsersQuery } from '@graphql/generated';
import useRemoteDataQuery from '@hooks/useRemoteDataQuery';

import { AuthedStackParamList, AuthedUserContext } from '@navigation/Authed';

const auth = getAuth();

export default function Home(props: NativeStackScreenProps<AuthedStackParamList, 'Home'>) {
  const { community } = props.route.params;

  const user = useContext(AuthedUserContext);
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
      <Text>Hello {user.email}</Text>
      <Text>Community {community.name}</Text>
      <Button title="Sign out" onPress={() => signOut(auth)} />
    </View>
  );
}
