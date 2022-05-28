import { User, Prisma, PrismaClient } from '@prisma/client';

export async function getAllUsers(client: PrismaClient): Promise<User[]> {
  return client.user.findMany();
}

export async function getUser(client: PrismaClient, id: number): Promise<User | null> {
  return client.user.findUnique({ where: { id } });
}

export async function createUser(client: PrismaClient, data: Prisma.UserCreateInput): Promise<User> {
  return client.user.create({
    data: data,
  });
}

export async function deleteAllUsers(client: PrismaClient) {
  await client.user.deleteMany({});
}
