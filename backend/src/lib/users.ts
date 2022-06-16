import { Prisma, PrismaClient, User, UserRole } from '@prisma/client';
import * as bluebird from 'bluebird';

import * as stream from '@external/stream';

import * as users from '@db/users';

// CRUD

export async function getUserByEmail(client: PrismaClient, email: string): Promise<User | null> {
  const user = await users.getUserByEmail(client, email);
  if (!user) return null;

  return user;
}

export async function getCommunitiesForUser(client: PrismaClient, userId: number, role?: UserRole) {
  const communities = await users.getCommunitiesForUser(client, userId, role);

  // Side effects
  // TODO: catch error
  await bluebird.map(communities, (c) => stream.addUsersToChannel(c.community, [c]));

  return communities;
}

export async function createUser(client: PrismaClient, data: Prisma.UserCreateInput): Promise<User> {
  const user = await users.createUser(client, data);

  // Side effects
  await stream.upsertUser(user.id, getName(user));

  return user;
}

export async function updateUser(
  client: PrismaClient,
  userId: number,
  data: Prisma.UserUpdateInput,
): Promise<User> {
  const user = await users.updateUser(client, userId, data);
  return user;
}

// Helpers

export async function getUserChatToken(client: PrismaClient, userId: number): Promise<string> {
  const user = await users.getUser(client, userId);
  if (!user) throw new Error(`User ${userId} not found`);

  await stream.upsertUser(user.id, getName(user));

  if (!user.isRegisteredInStream) {
    updateUser(client, userId, { isRegisteredInStream: true });
  }

  return stream.generateToken(userId);
}

export function getName(user: User): string | undefined {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName) return user.firstName;

  return;
}
