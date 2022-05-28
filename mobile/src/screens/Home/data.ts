import { gql } from '@apollo/client';

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
