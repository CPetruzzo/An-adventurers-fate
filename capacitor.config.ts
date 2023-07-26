import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.adventurer.app',
  appName: "An Adventurer's Fate",
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
