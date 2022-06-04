// prettier-ignore
import 'dotenv/config';
import 'module-alias/register';

import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { context } from './graphql/context';
import { schema } from './graphql/schema';

const server = new ApolloServer({
  schema,
  context,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
