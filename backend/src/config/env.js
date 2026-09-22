import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",

  DATABASE_URL: process.env.DATABASE_URL,

  CORS_ORIGINS: process.env.CORS_ORIGINS || "http://localhost:5173",
};

if (!ENV.DATABASE_URL) {
  console.warn(
    "[env] DATABASE_URL is not set — set it in backend/.env before starting the server."
  );
}