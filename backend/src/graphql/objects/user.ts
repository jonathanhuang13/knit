import { extendType, list, nonNull, nullable, objectType, stringArg } from 'nexus';

import * as stream from '@external/stream';

import { getAllUsers } from '@db/users';

import { createUser, getCommunitiesForUser, getUserByEmail, getUserChatToken } from '@lib/users';

import { Community } from './community';

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.int('id');
    t.string('email');
    t.nullable.string('firstName');
    t.nullable.string('lastName');
    t.field('chatUserId', {
      type: 'String',
      resolve: (parent, _args, _ctx) => {
        return stream.getStreamUserId(parent.id);
      },
    });
    t.field('chatToken', {
      type: 'String',
      authorize: async (parent, _args, ctx) => {
        return ctx.auth.isSelf(parent.id);
      },
      resolve: (parent, _args, ctx) => {
        return getUserChatToken(ctx.prisma, parent.id);
      },
    });
    t.field('adminCommunities', {
      type: list(Community),
      resolve: async (parent, args, ctx) => {
        const ucs = await getCommunitiesForUser(ctx.prisma, parent.id, 'ADMIN');
        return ucs.map((uc) => uc.community);
      },
    });
    t.field('memberCommunities', {
      type: list(Community),
      resolve: async (parent, args, ctx) => {
        const ucs = await getCommunitiesForUser(ctx.prisma, parent.id, 'MEMBER');
        return ucs.map((uc) => uc.community);
      },
    });

    // Example of authorization
    t.field('secret', {
      type: 'String',
      authorize: async (parent, _args, ctx) => {
        const isAuthorized = await ctx.auth.isCommunityAdmin(1);
        return isAuthorized;
      },
      resolve: (_parent, _args, _ctx) => {
        return 'foo';
      },
    });
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    // Users
    t.field('users', {
      type: nonNull(list('User')),
      resolve: async (_root, _args, ctx) => {
        return getAllUsers(ctx.prisma);
      },
    });

    // User by email
    t.field('userByEmail', {
      type: nullable(User),
      args: { email: stringArg() },
      resolve: async (_root, args, ctx) => {
        return getUserByEmail(ctx.prisma, args.email);
      },
    });
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    // CreateUser
    t.field('createUser', {
      type: nonNull('User'),
      args: {
        email: stringArg(),
        firstName: nullable(stringArg()),
        lastName: nullable(stringArg()),
      },
      resolve: (_root, args, ctx) => {
        return createUser(ctx.prisma, args);
      },
    });
  },
});
