import { router } from "../utils/trpc";

// Import modules
import { healthModule } from "../modules/health/health.module";
import { postsModule } from "../modules/posts/posts.module";

export const appRouter = router({
  health: healthModule,
  posts: postsModule,
});

export type AppRouter = typeof appRouter;
