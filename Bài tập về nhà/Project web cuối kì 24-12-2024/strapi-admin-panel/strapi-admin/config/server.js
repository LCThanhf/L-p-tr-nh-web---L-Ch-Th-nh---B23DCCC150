module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'cd95c04a694bb3c287fbad36eab64acf'),
    },
  },
  timezone: 'Asia/Ho_Chi_Minh',
});
