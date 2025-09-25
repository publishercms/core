import { router, procedure } from "../../utils/trpc";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { db } from "../../db/connection";
import { postsSchema } from "../../db/schema";
import { eq, and } from "drizzle-orm";

export const postsModule = router({

  list: procedure
    .input(z.object({
      type: z.string().optional(),
    }))
    .query(async (opts) => {
      console.log('### opts.input', opts.input.type);
      const conditions = [
        opts.input.type ? eq(postsSchema.type, String(opts.input.type)) : undefined,
        // add more optional filters later...
      ].filter(Boolean);

      const posts = await db
        .query
        .postsSchema
        .findMany({
          where: opts.input.type ? eq(postsSchema.type, opts.input.type) : undefined,
        });

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
