import { join } from 'path';
import { makeSchema, declarativeWrappingPlugin } from 'nexus';

import * as types from './objects';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '.', 'generated', 'nexus-typegen.ts'),
    schema: join(__dirname, '.', 'generated', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
  plugins: [declarativeWrappingPlugin()],
  nonNullDefaults: { output: true, input: true },
});
