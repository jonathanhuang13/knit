import * as users from './users';

const USERS = [
  {
    first_name: 'Jonathan',
    last_name: 'Huang',
  },
  { first_name: 'Elysa', last_name: 'Kohrs' },
];

async function seedUsers(): Promise<void> {
  await Promise.all(
    USERS.map((user) => users.createUser(user.first_name, user.last_name)),
  );
}

async function seedAll(): Promise<void> {
  await users.deleteAllUsers();
  await seedUsers();
}

seedAll();
