# Library Management System Architecture

## Overview
A full-stack web application for library management using React (frontend), Express.js with TypeScript (backend), and MongoDB (database) with Mongoose ODM.

## Tech Stack
- **Frontend**: React, TypeScript, React Router
- **Backend**: Express.js, TypeScript, JWT for authentication
- **Database**: MongoDB with Mongoose
- **Additional**: bcrypt for password hashing, CORS for cross-origin requests

## System Architecture

### Database Schema
#### User Model
- _id: ObjectId
- name: String
- email: String (unique)
- password: String (hashed)
- role: String (enum: 'student', 'librarian', 'admin')
- createdAt: Date

#### Book Model
- _id: ObjectId
- title: String
- author: String
- isbn: String (unique)
- genre: String
- description: String
- availableCopies: Number
- totalCopies: Number
- borrowCount: Number (for recommendations)
- createdAt: Date

#### Borrowing Model
- _id: ObjectId
- userId: ObjectId (ref: User)
- bookId: ObjectId (ref: Book)
- borrowDate: Date
- dueDate: Date
- returnDate: Date (optional)
- status: String (enum: 'borrowed', 'returned', 'overdue')

### API Endpoints

#### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (protected)

#### Books
- GET /api/books (with search/filter)
- GET /api/books/:id
- POST /api/books (librarian/admin)
- PUT /api/books/:id (librarian/admin)
- DELETE /api/books/:id (librarian/admin)
- GET /api/books/recommendations (popularity-based)

#### Borrowings
- POST /api/borrowings/borrow (student/librarian)
- POST /api/borrowings/return/:id (librarian/admin)
- GET /api/borrowings/my (user's borrowings)
- GET /api/borrowings (all, librarian/admin)

#### Users (Admin only)
- GET /api/users
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

### Frontend Structure
- `/` - Login/Register
- `/dashboard` - Main dashboard (different views for roles)
- `/books` - Book listing and search
- `/books/:id` - Book details
- `/borrowings` - User's borrowings
- `/admin` - Admin panel (users, books management)

### Role Permissions
- **Student**: View books, search, borrow books, view recommendations, view own borrowings
- **Librarian**: All student permissions + CRUD books, view all borrowings, manage returns
- **Admin**: All librarian permissions + CRUD users

### Recommendations Logic
- Sort books by borrowCount descending
- Limit to top 10 most borrowed books

## Deployment Considerations
- Environment variables for MONGO_DB_URI, JWT_SECRET
- CORS configured for frontend domain
- Password hashing with bcrypt
- JWT tokens for session management