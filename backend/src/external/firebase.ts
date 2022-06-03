import { ExpressContext } from 'apollo-server-express';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp({
  credential: applicationDefault(),
});

const FIREBASE_AUTH = getAuth(app);

function getFirebaseToken(request: ExpressContext['req']): string | null {
  const bearerHeader = request.headers.authorization;
  return bearerHeader?.replace(/^Bearer\s/, '') ?? null;
}

export async function getFirebaseUserEmailFromAuth(request: ExpressContext['req']): Promise<string | null> {
  const firebaseToken = getFirebaseToken(request);
  if (!firebaseToken) return null;

  const { email } = await FIREBASE_AUTH.verifyIdToken(firebaseToken);
  return email ?? null;
}
