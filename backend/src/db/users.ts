import { User, Prisma } from '@prisma/client';

import { PRISMA_CLIENT } from './client';

export async function getUser(id: number): Promise<User> {
  return PRISMA_CLIENT.user.findUnique({ where: { id } });
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return PRISMA_CLIENT.user.create({
    data: data,
  });
}

export async function deleteAllUsers() {
  await PRISMA_CLIENT.user.deleteMany({});
}
