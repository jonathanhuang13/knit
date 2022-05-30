import { PrismaClient, UserRole } from '@prisma/client';

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
