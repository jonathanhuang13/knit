// prettier-ignore
import 'react-native-gesture-handler';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuth } from 'firebase/auth';
import { Box, NativeBaseProvider } from 'native-base';

import firebaseApp from '@external/firebase';

import { getExpoServerIP } from '@utils/network';

import RootNavigation from './src/navigation';

const httpLink = new HttpLink({
  uri: getExpoServerIP(4001),
});

const authLink = setContext(async (_, { headers }) => {
  const auth = getAuth(firebaseApp);
  const token = await auth.currentUser?.getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <Box width="100%" height="100%" safeArea>
          <RootNavigation />
        </Box>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
