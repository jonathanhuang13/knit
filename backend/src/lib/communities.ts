import { Community, Prisma, PrismaClient, UserRole } from '@prisma/client';

import * as stream from '@external/stream';

import * as communities from '@db/communities';

export async function getUsersInCommunity(client: PrismaClient, communityId: number, role?: UserRole) {
  const community = await communities.getCommunity(client, communityId);
  if (!community) throw Error(`Could not find community ${communityId}`);

  const communityUsers = await communities.getUsersInCommunity(client, communityId, role);

  // Side effects
  await stream.addUsersToChannel(community, communityUsers);

  return communityUsers;
}

export async function createCommunity(
  client: PrismaClient,
  data: Prisma.CommunityCreateInput,
): Promise<Community> {
  const community = await communities.createCommunity(client, data);

  // Side effects
  await stream.createChannel(community);

  return community;
}
