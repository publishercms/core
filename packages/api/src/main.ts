import { Hono } from "hono";
import { serve } from "@hono/node-server"
import { serveStatic } from '@hono/node-server/serve-static'
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "./utils/trpc";

// Import main router
import { appRouter } from "./infra/router";


// Create main app
const PORT = process.env.PORT ?? 8001;
const app = new Hono();

app.all("/trpc/*", (c) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => createContext({ req: c.req.raw }),
  })
);

app.get("/client-schema.d.ts", serveStatic({
  path: "./types/client.d.ts",
}));

serve({
  fetch: app.fetch,
  port: typeof PORT == 'string' ? parseInt(PORT) : PORT,
});
