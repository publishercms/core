import { Hono } from "hono";
import { moduleRegistry } from "./src/infra/module-registry.ts";
import { ModuleLoader } from "./src/infra/module-loader.ts";

const PORT = Deno.env.get('PORT') ?? 8000;

// Create main app
const app = new Hono();
const moduleLoader = new ModuleLoader();

async function initializeApp() {
  await moduleLoader.loadModulesFromDirectory('./src/modules');

  // Register all modules to moduleRegistry
  moduleLoader.getModules().forEach(async (module) => {
    await moduleRegistry.register(module);
  });

  // Mount all module routes
  moduleRegistry.getAll().forEach((module) => {
    console.log(`Mounting routes for module: ${module.name}`);
    app.route('/', module.app);
  });

  Deno.serve({
    port: typeof PORT == 'string' ? parseInt(PORT) : PORT,
  }, app.fetch);
}

// Initialize the app
await initializeApp();

// Export the app type for client-side typing
export type AppType = typeof app;
export default app;