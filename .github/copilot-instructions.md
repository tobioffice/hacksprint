# Library Management System - AI Coding Instructions

## Architecture Overview

This is a **full-stack TypeScript library management system** with separate backend/frontend directories using a **role-based authentication system** (student/librarian/admin). The system manages books, borrowings, and users with MongoDB as the database.

**Key Architecture Components:**
- **Backend**: Express.js + TypeScript + Mongoose ODM (`backend/src/`)
- **Frontend**: React + TypeScript + Vite + TailwindCSS (`frontend/src/`)
- **Package Manager**: pnpm (not npm/yarn)
- **Authentication**: JWT tokens with role-based middleware

## Critical Development Patterns

### Authentication & Authorization
All protected routes use the **two-middleware pattern**:
```typescript
router.post('/', authenticateToken, requireRole(['librarian', 'admin']), async (req: AuthRequest, res) => {
  // Route logic
});
```

- Use `AuthRequest` interface for typed request objects with user data
- Frontend stores tokens in `localStorage` and user data separately
- Hardcoded backend URL: `http://localhost:5000` in frontend components

### Data Models & Relationships
**Core Models** (`backend/src/models/`):
- **User**: name, email, password, role (student/librarian/admin)
- **Book**: title, author, isbn (unique), availableCopies, totalCopies, borrowCount
- **Borrowing**: userId, bookId, borrowDate, dueDate, returnDate, status

**Population Pattern**: Always populate related data in borrowing routes:
```typescript
.populate('userId', 'name email')
.populate('bookId', 'title author')
```

### Business Logic Conventions
- **Book Borrowing**: Decrements `availableCopies`, increments `borrowCount`
- **Book Returns**: Increments `availableCopies` back
- **Due Date**: Always 14 days from borrow date
- **Recommendations**: Random selection from all books (not popularity-based despite borrowCount tracking)

### Error Handling Standard
Consistent error response format across all routes:
```typescript
res.status(400).json({ message: 'Specific error message' });
```

## Development Workflows

### Running the Application
```bash
# Root level uses pnpm
pnpm install

# Backend development
cd backend
pnpm dev          # Uses ts-node for development
pnpm build        # TypeScript compilation
pnpm start        # Production (requires build first)

# Frontend development  
cd frontend
pnpm dev          # Vite dev server
pnpm build        # TypeScript + Vite build
```

### Database Seeding
- **Seed Script**: `backend/seed.js` (CommonJS, not TypeScript)
- **Seed Route**: `POST /api/seed` endpoint in server.ts
- **Pattern**: Always check for existing records by ISBN before creating

### Environment Setup
- Backend requires `MONGO_DB_URI` and `JWT_SECRET` in `.env`
- Frontend hardcodes API URLs (no environment variables used)

## Frontend Patterns

### Component Structure
- **Page Components**: Located in `src/pages/` (Dashboard, Books, Borrowings, Admin, Login)
- **Navigation**: Role-based nav items (admin sees extra "Admin" link)
- **State Management**: Direct useState with localStorage, no global state library

### API Integration
- **HTTP Client**: Axios with manual token header injection
- **Auth Check Pattern**: Every protected page checks localStorage token in useEffect
- **Error Handling**: Redirects to login on auth failure

### Styling
- **CSS Framework**: TailwindCSS with standard utility classes
- **Layout Pattern**: Full-height pages with `min-h-screen bg-gray-100`
- **Component Styling**: Consistent card layouts with `bg-white shadow rounded-lg`

## Key Files for Understanding

- `plan.md` - Complete system architecture and API documentation
- `backend/src/server.ts` - Main server setup with inline seed route
- `backend/src/middleware/auth.ts` - Authentication logic and role checking
- `backend/src/models/` - Database schema definitions
- `frontend/src/pages/Dashboard.tsx` - Main frontend patterns and navigation
- `backend/seed.js` - Database seeding with sample books

## Common Gotchas

1. **Mixed Module Systems**: Backend uses ES modules, seed script uses CommonJS
2. **Route Order**: Recommendations route must be defined before `/:id` routes to avoid conflicts
3. **CORS**: Backend has open CORS policy for development
4. **TypeScript**: Backend compiles to `dist/` directory, production uses compiled JS
5. **Borrowing Logic**: Always update both Borrowing record AND Book availableCopies in transactions