const users = [{ id: '1', firstName: 'first', lastName: 'last' }];

export const resolvers = {
  Query: {
    users: () => users,
  },
};
