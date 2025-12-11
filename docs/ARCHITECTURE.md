# Hizmetgo Architecture Overview

## System Architecture

Hizmetgo, Next.js 14 App Router kullanarak geliştirilmiş full-stack bir web uygulamasıdır.

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT, Supabase Auth
- **Mobile**: React Native (Expo)
- **Deployment**: Vercel

## Project Structure

```
app/
├── (public)/          # Public pages (homepage, auth, etc.)
├── (customer)/        # Customer dashboard and pages
├── (business)/        # Business dashboard
├── (authenticated)/   # Authenticated user pages
└── api/               # API routes

components/
├── layout/            # Layout components (Header, Footer)
├── home/              # Homepage components
├── ui/                # Reusable UI components
└── ...

lib/
├── auth/              # Authentication utilities
├── services/          # Business logic services
├── utils/             # Utility functions
└── ...
```

## Authentication Flow

1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. JWT token is created and stored in HTTP-only cookie
3. Middleware validates token on protected routes
4. User session is maintained via cookie

## Database Schema

Main models:
- **User**: Customer, Vendor, Admin users
- **Business**: Service provider businesses
- **Job**: Service requests from customers
- **Order**: Completed service orders
- **Review**: Customer reviews and ratings
- **Wallet**: User wallet and transactions

## API Routes

All API routes are under `/api`:
- `/api/auth/*` - Authentication endpoints
- `/api/jobs/*` - Job management
- `/api/orders/*` - Order management
- `/api/businesses/*` - Business endpoints
- `/api/admin/*` - Admin panel endpoints

## Security

- JWT-based authentication
- Rate limiting on sensitive endpoints
- Input sanitization
- CSRF protection
- Security headers (CSP, HSTS, etc.)
- Password policy enforcement
- Audit logging

## Performance Optimizations

- API response caching
- Database query optimization
- Image optimization via Next.js Image
- Code splitting and lazy loading
- Compression enabled

## Deployment

The application is deployed on Vercel with:
- Automatic deployments from main branch
- Environment variables configured in Vercel dashboard
- Database migrations run automatically

