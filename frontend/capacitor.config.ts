import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arosaje.app',
  appName: 'arosaje',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
