import Constants from 'expo-constants';

const { manifest } = Constants;

export function getExpoServerIP(port: number): string {
  const isDev = typeof manifest?.packagerOpts === `object` && !!manifest.packagerOpts.dev;

  if (isDev) {
    const host = manifest.debuggerHost?.split(`:`).shift();
    if (!host) throw new Error(`Invalid host: ${manifest.debuggerHost}`);

    return `http://${host}:${port}`;
  }

  // Prod API
  return `http://localhost:${port}`;
}
