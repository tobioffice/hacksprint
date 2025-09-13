import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import bookRoutes from './routes/books';
import borrowingRoutes from './routes/borrowings';
import userRoutes from './routes/users';
import Book from './models/Book';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrowings', borrowingRoutes);
// Seed route for dummy data
app.post('/api/seed', async (req, res) => {
  try {
    const books = [
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', genre: 'Fiction', totalCopies: 5 },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', genre: 'Fiction', totalCopies: 3 },
      { title: '1984', author: 'George Orwell', isbn: '978-0451524935', genre: 'Dystopian', totalCopies: 4 },
      { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0486284736', genre: 'Romance', totalCopies: 2 },
      { title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0316769488', genre: 'Fiction', totalCopies: 3 }
    ];

    for (const bookData of books) {
      const existingBook = await Book.findOne({ isbn: bookData.isbn });
      if (!existingBook) {
        const book = new Book(bookData);
        await book.save();
      }
    }

    res.json({ message: 'Dummy books added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});