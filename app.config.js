import "dotenv/config";

export default {
  expo: {
    name: "Expo Firebase Starter",
    slug: "expo-firebase",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "0.19.0",
    orientation: "portrait",
    icon: "./assets/flame.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#F57C00",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    extra: {
      apiKey: "AIzaSyDqEDCO-IzgO68Lo7MOtK_kHxlsqGPAHAo",
      authDomain: "winghacks2025.firebaseapp.com",
      projectId: "winghacks2025",
      storageBucket: "winghacks2025.firebasestorage.app",
      messagingSenderId: "116000525258",
      appId: "1:116000525258:web:aa5f688e9010694603dd33"
    },
  },
};
