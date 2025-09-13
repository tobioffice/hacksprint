import express from 'express';
import Book from '../models/Book';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all books with search/filter
router.get('/', async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } }
      ];
    }

    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create book (librarian/admin)
router.post('/', authenticateToken, requireRole(['librarian', 'admin']), async (req: AuthRequest, res) => {
  try {
    const { title, author, isbn, genre, description, totalCopies } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }

    const book = new Book({
      title,
      author,
      isbn,
      genre,
      description,
      totalCopies: totalCopies || 1,
      availableCopies: totalCopies || 1
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update book (librarian/admin)
router.put('/:id', authenticateToken, requireRole(['librarian', 'admin']), async (req: AuthRequest, res) => {
  try {
    const { title, author, isbn, genre, description, totalCopies } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if ISBN is being changed and if it's unique
    if (isbn !== book.isbn) {
      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
        return res.status(400).json({ message: 'Book with this ISBN already exists' });
      }
    }

    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.genre = genre;
    book.description = description;
    book.totalCopies = totalCopies;
    book.availableCopies = Math.min(book.availableCopies, totalCopies);

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete book (librarian/admin)
router.delete('/:id', authenticateToken, requireRole(['librarian', 'admin']), async (req: AuthRequest, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Test route
router.get('/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Books route working' });
});

// Get recommendations (random selection)
router.get('/recommendations', async (req, res) => {
  try {
    console.log('Fetching recommendations...');
    // Get all books and randomly select up to 10
    const allBooks = await Book.find();
    console.log('Total books found:', allBooks.length);

    if (allBooks.length === 0) {
      return res.json([]);
    }

    // Shuffle array and take first 10
    const shuffled = allBooks.sort(() => 0.5 - Math.random());
    const recommendations = shuffled.slice(0, Math.min(10, allBooks.length));

    console.log('Returning recommendations:', recommendations.length);
    res.json(recommendations);
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;