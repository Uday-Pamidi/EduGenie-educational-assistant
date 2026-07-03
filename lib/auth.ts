import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.V0_RUNTIME_URL || "http://localhost:3000"),
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    "http://localhost:3000",
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
  ],
  advanced: {
    defaultCookieAttributes:
      process.env.NODE_ENV === "development"
        ? { sameSite: "lax", secure: false }
        : { sameSite: "lax", secure: true },
  },
});

// Initialize auth tables
pool.on("error", (err) => {
  console.error("[DB] Unexpected error on idle client", err);
});

export { pool };
