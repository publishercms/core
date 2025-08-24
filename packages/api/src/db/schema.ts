import { jsonb, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// Define core schemas

export const usersSchema = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  email: text('email').unique().notNull(),
});

export type User = typeof usersSchema.$inferSelect;
export type NewUser = typeof usersSchema.$inferSelect;

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
