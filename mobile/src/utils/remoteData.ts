type NotAsked = { type: 'notAsked' };
type Loading = { type: 'loading' };
type Success<TData> = { type: 'success'; data: TData };
type Error<TError> = { type: 'error'; error: TError };

export type RemoteData<TData, TError = string> = NotAsked | Loading | Success<TData> | Error<TError>;

export function isLoading<T, E>(remoteData: RemoteData<T, E>): remoteData is Loading {
  return remoteData.type === 'loading';
}

export function isError<T, E>(remoteData: RemoteData<T, E>): remoteData is Error<E> {
  return remoteData.type === 'error';
}

export function isNotAsked<T, E>(remoteData: RemoteData<T, E>): remoteData is NotAsked {
  return remoteData.type === 'notAsked';
}

export function isSuccess<T, E>(remoteData: RemoteData<T, E>): remoteData is Success<T> {
  return remoteData.type === 'success';
}
