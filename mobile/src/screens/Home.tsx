import React, { useContext } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';
import { Button, FlatList, Text, View } from 'react-native';

import { UsersDocument, UsersQuery } from '@graphql/generated';

import { isError, isLoading, isNotAsked } from '@utils/remoteData';

import useRemoteDataQuery from '@hooks/useRemoteDataQuery';

import { AuthedStackParamList, AuthedUserContext } from '@navigation/Authed';

const auth = getAuth();

export default function Home(_props: NativeStackScreenProps<AuthedStackParamList, 'Home'>) {
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
      <FlatList data={remoteData.data.users} renderItem={({ item }) => <Text>{item.email}</Text>} />
      <Button title="Sign out" onPress={() => signOut(auth)} />
    </View>
  );
}
