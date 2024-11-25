import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:uoYCqk9Sfl5E@ep-hidden-thunder-a5tc48di.us-east-2.aws.neon.tech/neondb?sslmode=require,",
  },
});

//  process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL
