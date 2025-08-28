import { router, procedure } from "../../utils/trpc";
import bcrypt from "bcrypt";
import { signJwt } from "../../utils/jwt";
import { db } from "../../db/connection";
import z from "zod";

export const authenticationModule = router({

  login: procedure
    .input(z.object({
      email: z.email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const user = await db.query.usersSchema.findFirst({
        where: (u, { eq }) => eq(u.email, input.email)
      });

      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      const token = signJwt({ id: user.id, email: user.email });
      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }),

});
