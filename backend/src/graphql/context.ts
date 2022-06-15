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
    isSelf(userId: number): Promise<boolean>;
    isCommunityAdmin(communityId: number): Promise<boolean>;
  };
}

export const context: ContextFunction<ExpressContext, Context> = async ({ req }) => {
  return {
    prisma: prismaClient,
    auth: {
      isSelf: async (userId) => {
        const email = await getFirebaseUserEmailFromAuth(req);
        if (!email) return false;

        const user = await users.getUserByEmail(prismaClient, email);
        if (!user) return false;

        return user.id === userId;
      },
      isCommunityAdmin: async (communityId) => {
        const email = await getFirebaseUserEmailFromAuth(req);
        if (!email) return false;

        const user = await users.getUserByEmail(prismaClient, email);
        if (!user) return false;

        const communityUser = await communityUsers.getCommunityUser(prismaClient, user.id, communityId);
        if (!communityUser || communityUser.role !== 'ADMIN') return false;

        return true;
      },
    },
  };
};
