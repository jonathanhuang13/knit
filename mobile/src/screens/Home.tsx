import React from 'react';
import { Text, FlatList, Pressable } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
    }
  }
`;

export default function Home() {
  const { data, loading } = useQuery(USERS_QUERY);

  if (loading) return <Text>Loading</Text>;

  return <FlatList data={data.users} renderItem={({ item }) => <Text>{item.email}</Text>} />;
}
