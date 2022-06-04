import { enumType, objectType } from 'nexus';

import { Community } from './community';
import { User } from './user';

export enum UserRoles {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export const UserRoleEnum = enumType({
  name: 'UserRole',
  members: UserRoles,
});

export const CommunityUser = objectType({
  name: 'CommunityUser',
  definition: (t) => {
    t.field('user', {
      type: User,
    });
    t.field('community', {
      type: Community,
    });
    t.field('role', { type: UserRoleEnum });
  },
});
