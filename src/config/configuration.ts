export default function config() {
  return {
    port: process.env.PORT,
    database: {
      uri: process.env.MONGO_URI,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    },
  };
}
