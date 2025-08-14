# Overview

This project is a cultural tourism website for Salitre, a municipality in Ceará, Brazil, known as the "Capital da Mandioca" (Capital of Cassava). The application showcases the rich history, quilombola communities, culture, tourist routes, gastronomy, and religious traditions of the region. It features a public-facing website with detailed sections about local heritage and an admin panel for content management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **UI Components**: Comprehensive design system built on Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom color palette reflecting Salitre's cultural identity (sertão browns, terra cotta, golden sand)
- **State Management**: TanStack Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **File Upload**: Multer middleware for handling image uploads with file type validation
- **API Design**: RESTful API with structured error handling and request logging middleware

## Content Management System
- **Rich Text Editing**: Custom rich text editor component with HTML formatting capabilities
- **Image Management**: Upload system with image gallery and file management
- **Content Sections**: Organized by cultural themes (historia, quilombolas, cultura, rotas, gastronomia, religiosidade)
- **Publishing Workflow**: Draft/published states for content control

## Database Schema Design
- **Users Table**: Admin authentication with role-based access control
- **Articles Table**: Content management with section categorization, publishing status, and metadata
- **Images Table**: File metadata tracking with upload attribution
- **Enum Types**: Predefined content sections using PostgreSQL enums for data integrity

## Development Environment
- **Hot Reload**: Vite development server with HMR for rapid development
- **TypeScript**: Full type safety across client, server, and shared code
- **Path Aliases**: Organized imports with @ aliases for clean code structure
- **Development Tools**: Replit-specific plugins for cloud development environment

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Drizzle Kit**: Database migration and schema management tools

## UI Framework
- **Radix UI**: Headless component primitives for accessibility-compliant interfaces
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent visual elements

## Development Tools
- **Vite**: Fast build tool with modern development features
- **ESBuild**: High-performance bundling for production builds
- **TypeScript**: Static type checking and enhanced developer experience

## File Management
- **Multer**: Express middleware for multipart/form-data handling
- **File System**: Local file storage with organized upload directory structure

## Authentication & Security
- **JSON Web Tokens**: Stateless authentication mechanism
- **Bcrypt**: Secure password hashing with salt rounds
- **CORS**: Cross-origin resource sharing configuration for API security