import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

import { getExpoServerIP } from '@utils/network';

const config = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

function initializeFirebase() {
  const app = initializeApp(config);
  const auth = getAuth(app);

  if (__DEV__) {
    console.log('Switching to local Firebase instance...');

    connectAuthEmulator(auth, getExpoServerIP(9099));
  }

  return app;
}

const app = initializeFirebase();
export default app;
