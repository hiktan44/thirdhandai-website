# Third Hand AI Agency Website

## Overview

This is a full-stack web application for Third Hand AI Agency, a company that provides custom AI solutions and automation services. The application is built as a modern single-page application with a React frontend and Express.js backend, showcasing the agency's services and allowing potential clients to contact them. The website features a bilingual interface (Turkish/English) with professional typography using Inter font for body text and Poppins font for headings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with JSON responses
- **Database**: Currently using in-memory storage with plans for PostgreSQL migration
- **ORM**: Drizzle ORM with PostgreSQL dialect configuration
- **Session Management**: Basic authentication without sessions (ready for PostgreSQL integration)

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Landing area with call-to-action buttons
- **Services Section**: Showcase of AI solutions and automations
- **Projects Section**: Portfolio of completed projects with external links
- **Video Projects**: Promotional content section
- **Contact Form**: Client inquiry form with validation
- **Admin Login**: Administrative access interface
- **Responsive Design**: Mobile-first approach with breakpoint considerations

### Backend Services
- **Contact API**: Handles contact form submissions
- **Admin API**: Basic authentication for administrative access
- **Storage Layer**: Abstracted storage interface supporting both in-memory and database implementations
- **Error Handling**: Centralized error handling with appropriate HTTP status codes

### Database Schema (PostgreSQL)
- **Users Table**: Admin user management (id, username, password)
- **Contact Messages Table**: Client inquiries (id, name, email, subject, message, privacy_accepted, created_at)

### Recent Updates (January 13, 2025)
- **Database Integration**: Migrated from in-memory storage to PostgreSQL database
- **Admin Panel Security**: Separated admin panel from main site
  - Admin login page at `/admin` route
  - Admin dashboard at `/admin/dashboard` route (requires authentication)
  - Session management with express-session and memory store
  - Authentication middleware protecting admin routes
- **Font Implementation**: System fonts used due to Replit cross-origin restrictions
- **Known Issues**: Cross-origin security errors in console are from Replit's iframe system and don't affect functionality

## Data Flow

1. **Client Interaction**: Users interact with the React frontend
2. **Form Submission**: Contact forms are validated client-side using Zod schemas
3. **API Communication**: TanStack Query manages API requests to Express backend
4. **Data Persistence**: Backend stores data using the storage abstraction layer
5. **Response Handling**: Success/error states are displayed via toast notifications

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Router alternative (Wouter)
- **UI Library**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, Class Variance Authority for component variants
- **Forms**: React Hook Form, Hookform Resolvers
- **Validation**: Zod for schema validation
- **State Management**: TanStack React Query
- **Date Handling**: date-fns for date manipulation

### Development Dependencies
- **Build Tools**: Vite, ESBuild for production builds
- **TypeScript**: Full TypeScript support with strict configuration
- **Database**: Drizzle ORM with Neon Database serverless driver
- **Development**: TSX for TypeScript execution, Replit-specific plugins

### Database Integration
- **Drizzle Kit**: Database migration and schema management
- **Neon Database**: Serverless PostgreSQL provider
- **Connection**: Environment-based database URL configuration

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: In-memory storage for rapid development
- **Environment**: NODE_ENV=development with development-specific logging

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Configured for PostgreSQL with Drizzle migrations
- **Environment**: NODE_ENV=production with production optimizations

### Deployment Configuration
- **Server**: Express serves both API routes and static frontend assets
- **Database Migration**: `db:push` command for schema synchronization
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection
- **Static Assets**: Served from `dist/public` directory in production

### Replit Integration
- **Development**: Special Replit plugins for enhanced development experience
- **Error Handling**: Runtime error modal for development debugging
- **File System**: Configured for Replit's file system restrictions

The application is designed to be easily deployable on various platforms while maintaining a clean separation between development and production configurations.