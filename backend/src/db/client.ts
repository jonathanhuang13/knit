import { createClient, Client } from 'edgedb';

export const EDGE_DB_CLIENT: Client = createClient();

// export function getClient() {
//   if (EDGE_DB_CLIENT) return EDGE_DB_CLIENT;

//   EDGE_DB_CLIENT = createClient();
//   return EDGE_DB_CLIENT;
// }
