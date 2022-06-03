import { join } from 'path';
import { makeSchema, declarativeWrappingPlugin, fieldAuthorizePlugin } from 'nexus';

import * as types from './objects';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), 'src', 'graphql', 'generated', 'nexus-typegen.ts'),
    schema: join(process.cwd(), 'src', 'graphql', 'generated', 'schema.graphql'),
  },
  contextType: {
    module: join(process.cwd(), 'src', 'graphql', 'context.ts'),
    export: 'Context',
  },
  plugins: [declarativeWrappingPlugin(), fieldAuthorizePlugin()],
  nonNullDefaults: { output: true, input: true },
});
