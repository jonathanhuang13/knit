import { Prisma, PrismaClient, Community } from '@prisma/client';

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
