import { router, procedure } from "../../utils/trpc";

export const healthModule = router({

  check: procedure
    .query(() => {
      const health = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: Math.round(performance.now() / 1000),
        version: "1.0.0",
      };

      return health;
    }),

});
