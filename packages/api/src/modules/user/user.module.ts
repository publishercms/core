import { router, protectedProcedure } from "../../utils/trpc";
import { db } from "../../db/connection";

export const userModule = router({

  me: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await db.query.usersSchema.findFirst({
        where: (u, { eq }) => eq(u.id, ctx.user.id),
        columns: {
          password: false,
        }
      });

      return user;
    }),

});
