import { list, objectType } from 'nexus';

import { getUsersInCommunity } from '@db/communities';

import { User } from './user';

export const Community = objectType({
  name: 'Community',
  definition: (t) => {
    t.int('id');
    t.string('name');
    t.nullable.string('description');
    t.field('adminUsers', {
      type: list(User),
      resolve: async (parent, args, ctx) => {
        const ucs = await getUsersInCommunity(ctx.prisma, parent.id, 'ADMIN');
        return ucs.map((uc) => uc.user);
      },
    });
    t.field('memberUsers', {
      type: list(User),
      resolve: async (parent, args, ctx) => {
        const ucs = await getUsersInCommunity(ctx.prisma, parent.id, 'MEMBER');
        return ucs.map((uc) => uc.user);
      },
    });
  },
});
