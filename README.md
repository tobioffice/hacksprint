# 📚 Library Management System

A modern, full-stack web application for managing library operations digitally. Built with React, Express.js, MongoDB, and TypeScript.

## 🚀 Features

### 👥 User Management
- **Multi-role Authentication**: Students, Librarians, and Admins
- **Secure JWT Authentication**: Password hashing with bcrypt
- **Role-based Access Control**: Different permissions for each user type

### 📖 Book Management
- **Search & Filter**: Find books by title, author, ISBN, or genre
- **Borrowing System**: Easy book reservations with due dates
- **Librarian Tools**: Add, edit, and delete books
- **Availability Tracking**: Real-time availability status

### 📊 Analytics & Recommendations
- **Popularity Tracking**: Books ranked by borrowing frequency
- **Smart Recommendations**: Discover trending books
- **Borrowing History**: Track personal and all borrowing records

### 🎨 Modern UI/UX
- **Responsive Design**: Works on all devices
- **Beautiful Interface**: Gradient designs and smooth animations
- **Intuitive Navigation**: Clean, professional layout

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Heroicons** - Beautiful SVG icons

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe server code
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

### Development Tools
- **pnpm** - Fast package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **pnpm** (recommended) or npm

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd library-management-system
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
pnpm install
```

#### Frontend
```bash
cd ../frontend
pnpm install
```

### 3. Environment Configuration

#### Backend (.env)
Create `backend/.env` file:
```env
MONGO_DB_URI=mongodb://localhost:27017/library-management
# OR for MongoDB Atlas:
# MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management

JWT_SECRET=your_super_secure_jwt_secret_here
PORT=5000
```

#### MongoDB Setup
- **Local MongoDB**: Install and start MongoDB locally
- **MongoDB Atlas**: Create a free cluster and get connection string

### 4. Seed Database (Optional)
Add sample books to get started:
```bash
cd backend
pnpm run seed
```

### 5. Start the Application

#### Single Command (Recommended)
```bash
# Build frontend and start backend (serves both API and frontend)
cd backend
pnpm build
pnpm start
```
**App runs on:** `http://localhost:5000`

#### Alternative: Development Mode
If you need hot-reloading during development:
```bash
# Terminal 1: Backend API only
cd backend
pnpm dev

# Terminal 2: Frontend dev server
cd frontend
pnpm dev
```

## 📖 Usage

### User Roles & Permissions

#### 👨‍🎓 Student
- Browse and search books
- Borrow available books
- View borrowing history
- See book recommendations

#### 👩‍🏫 Librarian
- All student permissions
- Add new books to collection
- Edit existing book information
- Delete books from system
- View all borrowing records
- Process book returns

#### 👨‍💼 Admin
- All librarian permissions
- Manage user accounts (create/edit/delete)
- System administration
- User role management

### Getting Started

1. **Register/Login**: Create an account or sign in
2. **Browse Books**: Use search and filters to find books
3. **Borrow Books**: Click "Borrow Book" on available titles
4. **Manage Library** (Librarians/Admins): Use management tools
5. **Track History**: View your borrowing records

## 📁 Project Structure

```
library-management-system/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── middleware/         # Authentication middleware
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   └── server.ts          # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── seed.js               # Database seeding script
├── frontend/                  # React application
│   ├── src/
│   │   ├── pages/            # React components/pages
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # App entry point
│   ├── package.json
│   ├── tailwind.config.js    # Tailwind configuration
│   └── vite.config.ts        # Vite configuration
├── README.md                 # This file
└── plan.md                   # Project planning document
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Books
- `GET /api/books` - Get all books (with search/filter)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book (librarian/admin)
- `PUT /api/books/:id` - Update book (librarian/admin)
- `DELETE /api/books/:id` - Delete book (librarian/admin)
- `GET /api/books/recommendations` - Get recommended books

### Borrowings
- `POST /api/borrowings/borrow` - Borrow a book
- `POST /api/borrowings/return/:id` - Return a book (librarian/admin)
- `GET /api/borrowings/my` - Get user's borrowing history
- `GET /api/borrowings` - Get all borrowings (librarian/admin)

### Users (Admin only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🧪 Testing

### Manual Testing
1. **Create Users**: Register with different roles
2. **Add Books**: Use librarian account to add books
3. **Borrow Books**: Test borrowing functionality
4. **Search/Filter**: Test search and genre filtering
5. **Admin Panel**: Test user management features

### Sample Test Data
The seed script provides 12 sample books across various genres:
- Harry Potter (Fantasy)
- 1984 (Dystopian)
- The Great Gatsby (Fiction)
- Pride and Prejudice (Romance)
- And more...

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
pnpm build
pnpm start
```

### Frontend Deployment
```bash
cd frontend
pnpm build
# Deploy the 'dist' folder to your hosting service
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_DB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_production_jwt_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Backend won't start:**
- Check MongoDB connection
- Verify environment variables
- Ensure port 5000 is available

**Frontend build fails:**
- Run `pnpm install` in frontend directory
- Check Node.js version (should be v18+)

**Authentication issues:**
- Clear browser localStorage
- Check JWT_SECRET in .env

**Database connection:**
- Ensure MongoDB is running
- Verify connection string in .env

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for modern library management**