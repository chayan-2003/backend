module.exports = [

  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['*'], // Allows all origins; replace '*' with specific domains in production for security
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },

];
