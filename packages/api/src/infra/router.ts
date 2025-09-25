import { router } from "../utils/trpc";

// Import modules
import { authenticationModule } from "../modules/authentication/authentication.module";
import { healthModule } from "../modules/health/health.module";
import { userModule } from "../modules/user/user.module";
import { postsModule } from "../modules/posts/posts.module";
import { schemaModule } from "../modules/schema/schema.module";

export const appRouter = router({
  authentication: authenticationModule,
  health: healthModule,
  user: userModule,
  posts: postsModule,
  schema: schemaModule,
});

export type AppRouter = typeof appRouter;
