module.exports = {
  name: "Secret Chat",
  slug: "secret-chat",
  version: "1.0.0",
  orientation: "portrait",
  extra: {
    GOOGLE_ANDROID_AUTH_CLIENT_ID: process.env.GOOGLE_ANDROID_AUTH_CLIENT_ID,
    GOOGLE_WEB_AUTH_CLIENT_ID: process.env.GOOGLE_WEB_AUTH_CLIENT_ID,
    ENV: process.env.ENV || "production",
  },
};