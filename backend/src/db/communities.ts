import { Community, Prisma, PrismaClient, UserRole } from '@prisma/client';

export async function getCommunity(client: PrismaClient, id: number) {
  return client.community.findUnique({
    where: {
      id,
    },
  });
}

export async function getUsersInCommunity(client: PrismaClient, communityId: number, role?: UserRole) {
  return client.communityUser.findMany({
    where: {
      communityId,
      role,
    },
    include: { user: true, community: true },
  });
}

export async function createCommunity(
  client: PrismaClient,
  data: Prisma.CommunityCreateInput,
): Promise<Community> {
  return client.community.create({
    data,
  });
}

export async function deleteAllCommunities(client: PrismaClient) {
  await client.community.deleteMany({});
}
