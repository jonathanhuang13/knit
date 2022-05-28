import 'module-alias/register';
import { ApolloServer } from 'apollo-server';

import { schema } from './graphql/schema';
import { context } from './graphql/context';

const server = new ApolloServer({
  schema,
  context,
  csrfPrevention: true,
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
