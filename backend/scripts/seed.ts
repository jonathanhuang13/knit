import 'module-alias/register';
import { PrismaClient } from '@prisma/client';

import * as users from '@db/users';

const PRISMA_CLIENT = new PrismaClient();

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
  await Promise.all(USERS.map((user) => users.createUser(PRISMA_CLIENT, user)));
}

async function seedAll(): Promise<void> {
  await users.deleteAllUsers(PRISMA_CLIENT);
  await seedUsers();
}

seedAll();
