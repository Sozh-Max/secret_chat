module.exports = {
  expo: {
    name: "Secret Chat",
    slug: "secret-chat",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/splash-icon.png",

    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain", // или "cover"
      backgroundColor: "#0c003e",
    },

    plugins: [
      [
        "expo-router",
        {
          "root": "./src/app"
        }
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/images/notification-icon.png",
          color: "#ffffff",
        }
      ],
      "react-native-appsflyer",
    ],

    android: {
      package: "com.itona.secretchat",
      // notification: {
      //   icon: "./assets/images/notification-icon.png",
      //   color: "#ffffff",
      // },
      permissions: ["NOTIFICATIONS", "SCHEDULE_EXACT_ALARM"],
      // adaptiveIcon: {
      //   foregroundImage: "./assets/images/logo.png",
      // },
    },

    extra: {
      GOOGLE_ANDROID_AUTH_CLIENT_ID: process.env.GOOGLE_ANDROID_AUTH_CLIENT_ID,
      GOOGLE_WEB_AUTH_CLIENT_ID: process.env.GOOGLE_WEB_AUTH_CLIENT_ID,
      REVENUE_CAT_API_KEY: process.env.REVENUE_CAT_API_KEY,
      APPSFLYER_DEV_KEY: process.env.APPSFLYER_DEV_KEY,
      STORAGE_URL: process.env.STORAGE_URL,
      ENV: process.env.MODE || "production",
    },

    scheme: "secretchat",
    userInterfaceStyle: "dark",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
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

    experiments: {
      typedRoutes: true,
    },
  },
};