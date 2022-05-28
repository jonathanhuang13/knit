import { objectType, extendType, nonNull, list, stringArg } from 'nexus';

import { createUser, getAllUsers } from '@db/users';

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.int('id');
    t.string('email');
    t.string('firstName');
    t.string('lastName');
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    // Users
    t.field('users', {
      type: nonNull(list('User')),
      resolve: (_root, _args, ctx) => {
        return getAllUsers(ctx.prisma);
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
        email: nonNull(stringArg()),
        firstName: stringArg(),
        lastName: stringArg(),
      },
      resolve: (_root, args, ctx) => {
        return createUser(ctx.prisma, args);
      },
    });
  },
});
