import { PrismaClient, Prisma, UserRole } from '@prisma/client';

import * as communities from '@db/communities';

const PRISMA_CLIENT = new PrismaClient();

const COMMUNITIES: Prisma.CommunityCreateInput[] = [
  {
    name: 'Subpar Sonics',
    slug: 'subpar-sonics',
    communityUsers: {
      create: [
        {
          role: UserRole.ADMIN,
          user: { create: { email: 'daniel@test.com', firstName: 'Daniel', lastName: 'Holliday' } },
        },
        {
          role: UserRole.MEMBER,
          user: { create: { email: 'min@test.com', firstName: 'Min', lastName: 'Woo' } },
        },
        {
          role: UserRole.MEMBER,
          user: { create: { email: 'jonathan@test.com', firstName: 'Jonathan', lastName: 'Huang' } },
        },
      ],
    },
  },
  {
    name: 'Seattle Co-op',
    slug: 'cg-coop',
    communityUsers: {
      create: [
        {
          role: UserRole.ADMIN,
          user: { create: { email: 'stacie@test.com', firstName: 'Stacie', lastName: 'Lee' } },
        },
        {
          role: UserRole.MEMBER,
          user: { connect: { email: 'jonathan@test.com' } },
        },
      ],
    },
  },
];

async function seedCommunities(): Promise<void> {
  await communities.createCommunity(PRISMA_CLIENT, COMMUNITIES[0]);
  await communities.createCommunity(PRISMA_CLIENT, COMMUNITIES[1]);
}

async function seedAll(): Promise<void> {
  await seedCommunities();
}

seedAll();
