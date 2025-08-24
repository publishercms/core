import { initTRPC } from "@trpc/server";

export const t = initTRPC.context<{
  token: string | null;
}>().create();

export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure;
