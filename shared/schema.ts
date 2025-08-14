import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const sectionEnum = pgEnum("section", [
  "historia",
  "quilombolas", 
  "cultura",
  "rotas",
  "gastronomia",
  "religiosidade"
]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const articles = pgTable("articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  section: sectionEnum("section").notNull(),
  featuredImage: text("featured_image"),
  published: boolean("published").notNull().default(false),
  authorId: varchar("author_id").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const images = pgTable("images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: text("size").notNull(),
  url: text("url").notNull(),
  uploadedBy: varchar("uploaded_by").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  images: many(images),
}));

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  uploader: one(users, {
    fields: [images.uploadedBy],
    references: [users.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertImageSchema = createInsertSchema(images).omit({
  id: true,
  createdAt: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Image = typeof images.$inferSelect;
export type InsertImage = z.infer<typeof insertImageSchema>;
export type LoginData = z.infer<typeof loginSchema>;
