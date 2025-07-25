import { Hono } from "hono";
import type { ApiModule } from "../../infra/types/common.ts";

// Create a Hono app instance for this module
const app = new Hono();

// Define your routes using Hono's fluent API
const get = app.get('/health', (c) => {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: Math.round(performance.now() / 1000),
    version: "1.0.0",
  };

  return c.json(health);
});

// Export the module
const healthModule: ApiModule = {
  name: "health",
  app,
};

export default healthModule;
