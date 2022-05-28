import { DocumentNode } from 'graphql';
import {
  ApolloError,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';

import { RemoteData } from '../utils/remoteData';

export default function useRemoteDataQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> & { remoteData: RemoteData<TData, ApolloError> } {
  const queryResult = useQuery<TData, TVariables>(query, options);

  let remoteData: RemoteData<TData, ApolloError> = { type: 'notAsked' };
  if (queryResult.loading) remoteData = { type: 'loading' };
  else if (queryResult.error) remoteData = { type: 'error', error: queryResult.error };
  else if (queryResult.data) remoteData = { type: 'success', data: queryResult.data };

  return { ...queryResult, remoteData };
}
