import { pgTable, text, uuid } from "drizzle-orm/pg-core";

// Define core schemas
export const usersSchema = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	username: text('username').unique().notNull(),
	password: text('password').notNull(),
	email: text('email').unique().notNull(),
});

export type User = typeof usersSchema.$inferSelect;
export type NewUser = typeof usersSchema.$inferSelect;
