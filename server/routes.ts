import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema, insertImageSchema, loginSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Multer configuration for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Auth middleware
const authenticateAdmin = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await storage.getUser(decoded.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Auth routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid request data' });
    }
  });

  app.post('/api/auth/verify', authenticateAdmin, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Article routes
  app.get('/api/articles', async (req, res) => {
    try {
      const { section, published } = req.query;
      
      let articles;
      if (published === 'true') {
        articles = await storage.getPublishedArticles(section as string);
      } else {
        articles = await storage.getArticles(section as string);
      }
      
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch articles' });
    }
  });

  app.get('/api/articles/:id', async (req, res) => {
    try {
      const article = await storage.getArticle(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch article' });
    }
  });

  app.post('/api/articles', authenticateAdmin, async (req: any, res) => {
    try {
      const articleData = insertArticleSchema.parse({
        ...req.body,
        authorId: req.user.id
      });
      
      const article = await storage.createArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid article data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create article' });
    }
  });

  app.put('/api/articles/:id', authenticateAdmin, async (req, res) => {
    try {
      const articleData = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(req.params.id, articleData);
      res.json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid article data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update article' });
    }
  });

  app.delete('/api/articles/:id', authenticateAdmin, async (req, res) => {
    try {
      await storage.deleteArticle(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete article' });
    }
  });

  // Image upload routes
  app.post('/api/images', authenticateAdmin, upload.single('image'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const imageData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size.toString(),
        url: `/uploads/${req.file.filename}`,
        uploadedBy: req.user.id
      };

      const image = await storage.createImage(imageData);
      res.status(201).json(image);
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload image' });
    }
  });

  app.get('/api/images', authenticateAdmin, async (req, res) => {
    try {
      const images = await storage.getImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch images' });
    }
  });

  app.delete('/api/images/:id', authenticateAdmin, async (req, res) => {
    try {
      await storage.deleteImage(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete image' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
