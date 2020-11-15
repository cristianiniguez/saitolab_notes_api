require('dotenv').config();

const config = {
  // CONFIG
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  // MONGO
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  // USERS
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  // AUTH
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = config;
