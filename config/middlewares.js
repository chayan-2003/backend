module.exports = [
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["*"], // Allow all origins
    },
  },
  "strapi::errors",
  "strapi::security",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];