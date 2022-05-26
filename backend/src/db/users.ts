import e from '@edgedb/edgeql-js';

import { EDGE_DB_CLIENT } from './client';

export async function getUser(id: string) {
  const query = e.select(e.User, (user) => ({
    filter: e.op(user.id, '=', e.uuid(id)),
    ...e.User['*'],
  }));

  return query.run(EDGE_DB_CLIENT);
}

export async function createUser(first_name: string, last_name: string) {
  const query = e.insert(e.User, {
    first_name,
    last_name,
  });

  const { id } = await query.run(EDGE_DB_CLIENT);
  return getUser(id);
}

export async function deleteAllUsers(): Promise<void> {
  const query = e.delete(e.User);
  await query.run(EDGE_DB_CLIENT);
}
