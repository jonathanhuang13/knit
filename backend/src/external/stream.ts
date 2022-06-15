import { StreamChat } from 'stream-chat';

const STREAM_CLIENT = StreamChat.getInstance(process.env.STREAM_API_KEY ?? '', process.env.STREAM_API_SECRET);

type StreamRole = 'user' | 'guest' | 'admin';

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

function getStreamUserId(userId: number): string {
  return `dev_${userId}`;
}
