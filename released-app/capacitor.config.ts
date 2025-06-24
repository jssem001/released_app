import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sesery.released',
  appName: 'Released',
  webDir: 'build',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '543449768371-o7c0svosbbbh45fldq3q2ei68k86nnvf.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
