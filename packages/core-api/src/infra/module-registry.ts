import type { ApiModule, DatabaseContext } from "./types/common.ts";
import { schemaRegistry } from "./schema-registry.ts";
import { updateDbInstance, database } from "../db/connection.ts";

export class ModuleRegistry {
  private modules: Map<string, ApiModule> = new Map();
  
  async register(module: ApiModule) {
    // Register the module's schema if it exists
    if (module.schema) {
      schemaRegistry.register(module.name, module.schema);
      // Update the db instance with the new schema
      updateDbInstance();
    }
    
    // Add database context middleware to the module's app
    module.app.use('*', async (c, next) => {
      c.set('db', database());
      await next();
    });
    
    this.modules.set(module.name, module);
    console.log(`Registered module: ${module.name}`);
  }
  
  async unregister(moduleName: string) {
    const module = this.modules.get(moduleName);
    if (module) {
      schemaRegistry.unregister(moduleName);
      // Update the db instance after removing schema
      updateDbInstance();
      this.modules.delete(moduleName);
      console.log(`Unregistered module: ${moduleName}`);
    }
  }
  
  getAll(): ApiModule[] {
    return Array.from(this.modules.values());
  }
  
  get(name: string): ApiModule | undefined {
    return this.modules.get(name);
  }
  
  // Get all registered schemas for drizzle
  getDrizzleSchema() {
    return schemaRegistry.getDrizzleSchema();
  }
}

export const moduleRegistry = new ModuleRegistry();
