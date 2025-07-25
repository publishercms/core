import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import type { ModuleSchema } from "./types/common.ts";

export class SchemaRegistry {
  private schemas: Map<string, ModuleSchema> = new Map();

  register(moduleName: string, schema: ModuleSchema) {
    this.schemas.set(moduleName, schema);
  }

  unregister(moduleName: string) {
    this.schemas.delete(moduleName);
  }

  getModuleSchema(moduleName: string): ModuleSchema | undefined {
    return this.schemas.get(moduleName);
  }

  getAllSchemas(): Record<string, PgTableWithColumns<any>> {
    const allSchemas: Record<string, PgTableWithColumns<any>> = {};

    for (const [moduleName, moduleSchema] of this.schemas) {
      for (const [tableName, table] of Object.entries(moduleSchema)) {
        // Prefix with module name to avoid conflicts
        const key = `${moduleName}_${tableName}`;
        allSchemas[key] = table;
      }
    }

    return allSchemas;
  }

  // Get a flattened schema for drizzle
  getDrizzleSchema(): Record<string, PgTableWithColumns<any>> {
    const schema: Record<string, PgTableWithColumns<any>> = {};

    for (const [_, moduleSchema] of this.schemas) {
      Object.assign(schema, moduleSchema);
    }

    return schema;
  }
}

export const schemaRegistry = new SchemaRegistry();
