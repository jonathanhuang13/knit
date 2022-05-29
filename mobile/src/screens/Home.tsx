import React, { useContext } from 'react';
import { Text, FlatList, View, Button } from 'react-native';
import { gql } from '@apollo/client';
import { getAuth, signOut } from 'firebase/auth';

import useRemoteDataQuery from '@hooks/useRemoteDataQuery';
import { isError, isLoading, isNotAsked } from '@utils/remoteData';
import { AuthedUserContext } from '../navigation/Authed';

const auth = getAuth();

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
    }
  }
`;

export interface UserQueryData {
  users: User[];
}

export interface User {
  id: string;
  email: string;
}

export default function Home() {
  const user = useContext(AuthedUserContext);
  const { remoteData } = useRemoteDataQuery<UserQueryData>(USERS_QUERY);

  if (isLoading(remoteData) || isNotAsked(remoteData)) {
    return <Text>Loading</Text>;
  }

  if (isError(remoteData)) {
    return <Text>Error {remoteData.error}</Text>;
  }

  return (
    <View>
      <Text>Hello {user.email}</Text>
      <FlatList data={remoteData.data.users} renderItem={({ item }) => <Text>{item.email}</Text>} />
      <Button title="Sign out" onPress={() => signOut(auth)} />
    </View>
  );
}
