import type { ApiModule } from "./types/common.ts";
import { resolve } from "node:path";

export class ModuleLoader {
  private modules: Map<string, ApiModule> = new Map();

  async loadModule(modulePath: string): Promise<void> {
    try {
      const resolvedPath = resolve(Deno.cwd(), modulePath);
      const fileUrl = `file://${resolvedPath}`;

      const module = await import(fileUrl);
      const apiModule: ApiModule = module.default;

      if (!apiModule.name && !apiModule.app) {
        throw new Error(`Invalid module structure in ${modulePath}`);
      }

      console.log(`✓ Loaded module: ${apiModule.name}`);
      this.modules.set(apiModule.name, apiModule);
    } catch (error) {
      console.error(`Failed to load module ${modulePath}:`, error);
      throw error;
    }
  }

  async loadModulesFromDirectory(dir: string): Promise<void> {
    try {
      for await (const entry of Deno.readDir(dir)) {
        if (entry.isFile && entry.name.endsWith('.module.ts')) {
          await this.loadModule(`${dir}/${entry.name}`);
        }

        if (entry.isDirectory) {
          await this.loadModulesFromDirectory(`${dir}/${entry.name}`);
        }
      }
    } catch (error) {
      console.error(`Failed to load modules from ${dir}:`, error);
    }
  }

  getModules(): ApiModule[] {
    return Array.from(this.modules.values());
  }
};
