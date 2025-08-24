import { router, procedure } from "../../utils/trpc";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/connection";
import { postsSchema } from "../../db/schema";

export const postsModule = router({

  list: procedure
    .query(async (opts) => {
      const posts = await db.select().from(postsSchema);
      return posts;
    }),

  create: procedure
    .input(createInsertSchema(postsSchema))
    .mutation(async (opts) => {
      const createdPost = await db
        .insert(postsSchema)
        .values(opts.input)
        .returning();

      return createdPost;
    }),

});
