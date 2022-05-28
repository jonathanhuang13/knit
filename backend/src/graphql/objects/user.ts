import { objectType, extendType, nonNull, list, stringArg, nullable } from 'nexus';

import { createUser, getAllUsers } from '@db/users';

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.int('id');
    t.string('email');
    t.nullable.string('firstName');
    t.nullable.string('lastName');
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
