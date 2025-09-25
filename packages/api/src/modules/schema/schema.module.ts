import { router, procedure } from "../../utils/trpc";
import { z } from "zod";
import { SchemaTypes } from "../../services/configuration.service";

export const schemaModule = router({

  list: procedure
    .input(z.object({
      schemaType: z.custom<SchemaTypes>()
    }))
    .query(async (opts) => {
      const { schemaType } = opts.input;
      const { configurationService } = opts.ctx;

      return configurationService.getLoadedSchemasFor(schemaType);
    }),

});
