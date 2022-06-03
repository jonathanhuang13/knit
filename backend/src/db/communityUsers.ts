import { CommunityUser, PrismaClient, UserRole } from '@prisma/client';

export async function getCommunityUser(
  client: PrismaClient,
  userId: number,
  communityId: number,
): Promise<CommunityUser | null> {
  return client.communityUser.findUnique({
    where: {
      userId_communityId: {
        userId,
        communityId,
      },
    },
  });
}

export async function addUserToCommunity(
  client: PrismaClient,
  communityId: number,
  userId: number,
  role: UserRole,
): Promise<void> {
  await client.communityUser.create({
    data: {
      role,
      community: {
        connect: {
          id: communityId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
