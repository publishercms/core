import { Hono } from "hono";
import { serve } from "@hono/node-server"
import { serveStatic } from '@hono/node-server/serve-static'
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// Import main router
import { appRouter } from "./infra/router";

function createContext(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") ?? null;
  return { token };
};

// Create main app
const PORT = process.env.PORT ?? 8000;
const app = new Hono();

app.all("/trpc/*", (c) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => createContext(c.req.raw),
  })
);

app.get("/client-schema.d.ts", serveStatic({
  path: "./types/client.d.ts",
}));

serve({
  fetch: app.fetch,
  port: typeof PORT == 'string' ? parseInt(PORT) : PORT,
});
