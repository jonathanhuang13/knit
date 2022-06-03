/** Example of using directives, not currently being used though */
import { directive, list } from 'nexus';

import { UserRoleEnum } from './objects/communityUser';

export const authDirective = directive({
  name: 'AuthDirective',
  locations: ['OBJECT', 'FIELD_DEFINITION'],
  args: {
    role: list(UserRoleEnum.asArg()),
  },
});
