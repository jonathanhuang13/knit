import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { getExpoServerIP } from '@utils/network';

import RootNavigation from './src/navigation';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: getExpoServerIP(4001),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootNavigation />
    </ApolloProvider>
  );
}
