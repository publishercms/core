import { Hono } from "hono";
import { jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import type { ApiModule } from "../../infra/types/common.ts";
import { database } from "../../db/connection.ts";

// Define schema
export const postsSchema = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  status: varchar('status', { length: 255 }).notNull(),
  content: jsonb('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Post = typeof postsSchema.$inferSelect;
export type NewPost = typeof postsSchema.$inferInsert;

// Create the Hono app for this module
const app = new Hono();

// Define routes using Hono
app.get('/posts', async (c) => {
  const posts = await database().select().from(postsSchema);
  return c.json(posts);
});

app.post('/posts', async (c) => {
  const body: NewPost = await c.req.json();

  const createdPost = await database()
    .insert(postsSchema)
    .values({
      title: body.title,
      slug: body.slug,
      status: body.status,
      content: body.content,
    })
    .returning();

  return c.json(createdPost[0], 201);
});

// Export the module
const postsModule: ApiModule = {
  name: 'posts',
  app,
  schema: {
    postsSchema,
  },
};

export default postsModule;