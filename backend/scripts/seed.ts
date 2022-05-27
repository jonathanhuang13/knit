import 'module-alias/register';
import * as users from '@src/db/users';

const USERS = [
  {
    email: 'email1@gmail.com',
    firstName: 'Jonathan',
    lastName: 'Huang',
  },
  {
    email: 'email2@gmail.com',
    firstName: 'Elysa',
    lastName: 'Kohrs',
  },
];

async function seedUsers(): Promise<void> {
  await Promise.all(USERS.map((user) => users.createUser(user.email, user.firstName, user.lastName)));
}

async function seedAll(): Promise<void> {
  await users.deleteAllUsers();
  await seedUsers();
}

seedAll();
