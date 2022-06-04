import { PrismaClient } from '@prisma/client';
import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';

import { getFirebaseUserEmailFromAuth } from '@external/firebase';

import * as communityUsers from '@db/communityUsers';
import * as users from '@db/users';

const prismaClient = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  auth: {
    isCommunityAdmin(communityId: number): Promise<boolean>;
  };
}

export const context: ContextFunction<ExpressContext, Context> = async ({ req }) => {
  return {
    prisma: prismaClient,
    auth: {
      isCommunityAdmin: async (communityId) => {
        const email = await getFirebaseUserEmailFromAuth(req);
        if (!email) return false;

        const user = await users.getOrCreateUser(prismaClient, email);
        const communityUser = await communityUsers.getCommunityUser(prismaClient, user.id, communityId);
        if (!communityUser || communityUser.role !== 'ADMIN') return false;

        return true;
      },
    },
  };
};
