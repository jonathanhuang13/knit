import { objectType, enumType } from 'nexus';

import { User } from './user';
import { Community } from './community';

const RoleEnum = enumType({
  name: 'Role',

  members: {
    ADMIN: 1,
    MEMBER: 2,
  },
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
    t.field('role', { type: RoleEnum });
  },
});
