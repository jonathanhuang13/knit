import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Community = {
  __typename?: 'Community';
  adminUsers: Array<User>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  memberUsers: Array<User>;
  name: Scalars['String'];
};

export type CommunityUser = {
  __typename?: 'CommunityUser';
  community: Community;
  role: UserRole;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  userByEmail?: Maybe<User>;
  users: Array<User>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  adminCommunities: Array<Community>;
  chatToken: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  memberCommunities: Array<Community>;
  secret: Scalars['String'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null }> };

export type AuthHomeQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type AuthHomeQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, email: string, chatToken: string, adminCommunities: Array<{ __typename?: 'Community', id: number, name: string, description?: string | null }>, memberCommunities: Array<{ __typename?: 'Community', id: number, name: string, description?: string | null }> } | null };

export type CommunityBasicsFragment = { __typename?: 'Community', id: number, name: string, description?: string | null };

export type SelfFragment = { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, email: string, chatToken: string };

export const CommunityBasicsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityBasics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CommunityBasicsFragment, unknown>;
export const SelfFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Self"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"chatToken"}}]}}]} as unknown as DocumentNode<SelfFragment, unknown>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const AuthHomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthHome"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Self"}},{"kind":"Field","name":{"kind":"Name","value":"adminCommunities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityBasics"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberCommunities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityBasics"}}]}}]}}]}},...SelfFragmentDoc.definitions,...CommunityBasicsFragmentDoc.definitions]} as unknown as DocumentNode<AuthHomeQuery, AuthHomeQueryVariables>;