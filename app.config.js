const pkg = require("./package.json");

module.exports = {
  expo: {
    name: "Secret Chat",
    slug: "secret-chat",
    version: pkg.version, // versionName

    orientation: "portrait",
    icon: "./assets/images/splash-icon.png",
    scheme: "secretchat",
    userInterfaceStyle: "dark",
    newArchEnabled: true,

    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#0c003e",
    },

    ios: {
      supportsTablet: true,
    },

    android: {
      package: "com.itona.secretchat",
      permissions: ["NOTIFICATIONS", "SCHEDULE_EXACT_ALARM"],
      softwareKeyboardLayoutMode: "resize",
      // adaptiveIcon: {
      //   foregroundImage: "./assets/images/logo.png",
      // },
    },

    androidNavigationBar: {
      visible: "sticky-immersive",
      barStyle: "dark-content",
      backgroundColor: "#000000",
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo.png",
    },

    plugins: [
      [
        "expo-router",
        {
          root: "./src/app",
        },
      ],
      "expo-font",
      "expo-image",
      "expo-video",
      "expo-web-browser",
      [
        "expo-notifications",
        {
          icon: "./assets/images/notification-icon.png",
          color: "#ffffff",
        },

      ],
      "react-native-appsflyer",
      "@react-native-google-signin/google-signin",
    ],

    experiments: {
      typedRoutes: true,
    },

    updates: {
      url: "https://u.expo.dev/61e342f3-7340-43ec-bcac-56835f1e7468"
    },
    runtimeVersion: {
      policy: "appVersion"
    },

    extra: {
      GOOGLE_WEB_AUTH_CLIENT_ID: process.env.GOOGLE_WEB_AUTH_CLIENT_ID,
      REVENUE_CAT_API_KEY: process.env.REVENUE_CAT_API_KEY,
      APPSFLYER_DEV_KEY: process.env.APPSFLYER_DEV_KEY,
      STORAGE_URL: process.env.STORAGE_URL,
      ENV: process.env.MODE || "production",
      eas: {
        projectId: "61e342f3-7340-43ec-bcac-56835f1e7468"
      }
    },
  },
};