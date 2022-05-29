import Constants from 'expo-constants';

export function getExpoServerIP(port: number): string {
  const { manifest } = Constants;

  if (__DEV__) {
    const host = manifest?.debuggerHost?.split(`:`).shift();
    if (!host) throw new Error(`Invalid host: ${manifest?.debuggerHost}`);

    return `http://${host}:${port}`;
  }

  // TODO: Prod API
  return `http://localhost:${port}`;
}
