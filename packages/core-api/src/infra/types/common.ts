import type { Hono } from "hono";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export interface DatabaseContext {
  db: NodePgDatabase<any>;
}

export interface ModuleSchema {
  [key: string]: PgTableWithColumns<any>;
}

export interface ApiModule {
  name: string;
  app: Hono;
  schema?: ModuleSchema;
  migrations?: string[];
  dependencies?: string[];
}

export interface ModulePlugin {
  install(context: DatabaseContext): Promise<ApiModule>;
  uninstall?(context: DatabaseContext): Promise<void>;
}
