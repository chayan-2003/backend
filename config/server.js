module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("PUBLIC_URL", "https://strapi-backend-71a0.onrender.com"), // ✅ Set backend URL
  proxy: true, // ✅ Needed for Render deployments
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "your-secret-key"), // ✅ Ensure secure admin login
    },
  },
  settings: {
    cors: {
      enabled: true,
      origin: [
        "https://chatsphere-frontend-ei1iq3xqu-chayan-2003s-projects.vercel.app",
      ], // ✅ Allow frontend to access Strapi API
    },
  },
});
