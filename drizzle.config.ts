import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

export default {
  driver: "turso",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN
  },
  tablesFilter: ["torneios_*"],
} satisfies Config;
