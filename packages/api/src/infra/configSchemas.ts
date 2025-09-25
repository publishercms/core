import { z } from "zod";

export const PostTypeSchema = z.object({
  name: z.string(),
  label: z.object({
    single: z.string(),
    multiple: z.string(),
    create: z.string().optional(),
  }),
  meta: z.array(
    z.object({
      name: z.string(),
      label: z.string(),
      type: z.string(),
      required: z.boolean().optional(),
    })
  ),
  admin: z.object({
    icon: z.string().optional(),
  }).optional(),
});

export type PostType = z.infer<typeof PostTypeSchema>;

export const ContentBlockSchema = z.object({
  type: z.string(),
});

export type ContentBlockType = z.infer<typeof ContentBlockSchema>;
