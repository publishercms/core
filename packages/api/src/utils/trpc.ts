import { initTRPC } from "@trpc/server";
import { verifyJwt } from "./jwt";

// Service instances for global TRPC context
import { configurationService } from "../services/configuration.service";

export async function createContext({ req }: { req: Request }) {
  const authHeader = req.headers.get("authorization");
  let user: { id: string; email: string } | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const decoded = verifyJwt<{ id: string; email: string }>(token);
    if (decoded) user = decoded;
  }

  return {
    user,
    configurationService,
  };
};

export const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create();

export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure;
export const protectedProcedure = procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new Error("Unauthorized");
  return next({ ctx: { ...ctx, user: ctx.user } });
});
