import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.gen.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: Deno.env.get("DATABASE_URL") || "postgresql://postgres:postgres@db:5432/cms_dev",
  },
  verbose: true,
  strict: true,
});
