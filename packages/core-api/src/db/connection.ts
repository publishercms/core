import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { moduleRegistry } from "../infra/module-registry.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create postgres connection
export const client = postgres(DATABASE_URL);

// Init db instance
let db = drizzle(client, { schema: {} });

// Create drizzle instance with dynamic schema
export const createDrizzleInstance = () => {
  const schema = moduleRegistry.getDrizzleSchema();
  return drizzle(client, { schema });
};

// Function to update the db instance with new schema
export const updateDbInstance = () => {
  db = createDrizzleInstance();
};

// Alternative: Create a getter that always returns the current schema
export const database = () => createDrizzleInstance();
