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
        "expo-notifications",
        {
          icon: "./assets/images/notification-icon.png",
          color: "#ffffff",
        }
      ],
      "react-native-appsflyer",
    ],

    android: {
      package: "com.klomax.secretchat",
      notification: {
        icon: "./assets/images/notification-icon.png",
        color: "#ffffff",
      },
      // adaptiveIcon: {
      //   foregroundImage: "./assets/images/logo.png",
      // },
    },

    extra: {
      GOOGLE_ANDROID_AUTH_CLIENT_ID: process.env.GOOGLE_ANDROID_AUTH_CLIENT_ID,
      GOOGLE_WEB_AUTH_CLIENT_ID: process.env.GOOGLE_WEB_AUTH_CLIENT_ID,
      APPSFLYER_DEV_KEY: process.env.APPSFLYER_DEV_KEY,
      ENV: process.env.MODE || "production",
    },
  },
};