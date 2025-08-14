import { users, articles, images, type User, type InsertUser, type Article, type InsertArticle, type Image, type InsertImage } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getArticles(section?: string): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  getPublishedArticles(section?: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article>;
  deleteArticle(id: string): Promise<void>;
  
  // Image methods
  createImage(image: InsertImage): Promise<Image>;
  getImages(): Promise<Image[]>;
  deleteImage(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getArticles(section?: string): Promise<Article[]> {
    if (section) {
      return await db
        .select()
        .from(articles)
        .where(eq(articles.section, section as any))
        .orderBy(desc(articles.createdAt));
    }
    return await db.select().from(articles).orderBy(desc(articles.createdAt));
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article || undefined;
  }

  async getPublishedArticles(section?: string): Promise<Article[]> {
    const conditions = [eq(articles.published, true)];
    if (section) {
      conditions.push(eq(articles.section, section as any));
    }
    
    return await db
      .select()
      .from(articles)
      .where(and(...conditions))
      .orderBy(desc(articles.createdAt));
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db
      .insert(articles)
      .values(article)
      .returning();
    return newArticle;
  }

  async updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article> {
    const [updatedArticle] = await db
      .update(articles)
      .set({ ...article, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return updatedArticle;
  }

  async deleteArticle(id: string): Promise<void> {
    await db.delete(articles).where(eq(articles.id, id));
  }

  async createImage(image: InsertImage): Promise<Image> {
    const [newImage] = await db
      .insert(images)
      .values(image)
      .returning();
    return newImage;
  }

  async getImages(): Promise<Image[]> {
    return await db.select().from(images).orderBy(desc(images.createdAt));
  }

  async deleteImage(id: string): Promise<void> {
    await db.delete(images).where(eq(images.id, id));
  }
}

export const storage = new DatabaseStorage();
