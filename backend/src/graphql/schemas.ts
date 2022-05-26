import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    users: [User]
  }
`;
