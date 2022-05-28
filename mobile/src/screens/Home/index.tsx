import React from 'react';
import { Text, FlatList } from 'react-native';

import useRemoteDataQuery from '../../hooks/useRemoteDataQuery';
import { isError, isLoading, isNotAsked } from '../../utils/remoteData';

import { UserQueryData, USERS_QUERY } from './data';

export default function Home() {
  const { remoteData } = useRemoteDataQuery<UserQueryData>(USERS_QUERY);

  if (isLoading(remoteData) || isNotAsked(remoteData)) {
    return <Text>Loading</Text>;
  }

  if (isError(remoteData)) {
    return <Text>Error {remoteData.error}</Text>;
  }

  return <FlatList data={remoteData.data.users} renderItem={({ item }) => <Text>{item.email}</Text>} />;
}
