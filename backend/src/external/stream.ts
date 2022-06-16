import { Community, CommunityUser, UserRole } from '@prisma/client';
import { StreamChat } from 'stream-chat';

const STREAM_CLIENT = StreamChat.getInstance(process.env.STREAM_API_KEY ?? '', process.env.STREAM_API_SECRET);

type StreamRole = 'user' | 'guest' | 'admin';

// USERS

export async function upsertUser(userId: number, name?: string, role: StreamRole = 'user'): Promise<void> {
  await STREAM_CLIENT.upsertUser({
    id: getStreamUserId(userId),
    role,
    name,
    username: undefined,
    test: undefined,
  });
}

export async function generateToken(userId: number): Promise<string> {
  return STREAM_CLIENT.createToken(getStreamUserId(userId));
}

// CHANNELS

export async function createChannel(community: Community): Promise<void> {
  const channel = STREAM_CLIENT.channel('messaging', getStreamCommunityId(community.id), {
    name: community.name,
  });
  await channel.create();
}

export async function addUsersToChannel(community: Community, users: CommunityUser[]): Promise<void> {
  const channel = await STREAM_CLIENT.getChannelById('messaging', getStreamCommunityId(community.id), {
    name: community.name,
  });

  throw Error('hi');
  const streamUsers = users.map((u) => ({
    user_id: getStreamUserId(u.userId),
    role: getStreamRole(u.role),
  }));
  await channel.addMembers(streamUsers);
}

export function getStreamUserId(userId: number): string {
  return `dev_${userId}`;
}

export function getStreamCommunityId(communityId: number): string {
  return `dev_${communityId}`;
}

function getStreamRole(userRole: UserRole): string {
  switch (userRole) {
    case 'ADMIN':
      return 'member';
    case 'MEMBER':
      return 'member';
  }
}
