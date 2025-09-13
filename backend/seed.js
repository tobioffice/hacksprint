const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./dist/models/Book.js').default;

const dummyBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    genre: 'Fiction',
    description: 'A classic American novel about the Jazz Age and the American Dream.',
    totalCopies: 5,
    borrowCount: 12
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0061120084',
    genre: 'Fiction',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    totalCopies: 3,
    borrowCount: 15
  },
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    genre: 'Dystopian',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    totalCopies: 4,
    borrowCount: 18
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0486284736',
    genre: 'Romance',
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    totalCopies: 2,
    borrowCount: 10
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0316769488',
    genre: 'Fiction',
    description: 'A controversial novel about teenage rebellion and angst.',
    totalCopies: 3,
    borrowCount: 8
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0547928227',
    genre: 'Fantasy',
    description: 'A fantasy adventure about Bilbo Baggins and his unexpected journey.',
    totalCopies: 4,
    borrowCount: 22
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    isbn: '978-0590353427',
    genre: 'Fantasy',
    description: 'The first book in the Harry Potter series about a young wizard\'s adventures.',
    totalCopies: 6,
    borrowCount: 25
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    isbn: '978-0307474278',
    genre: 'Thriller',
    description: 'A mystery thriller involving secret societies and hidden messages.',
    totalCopies: 3,
    borrowCount: 16
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    genre: 'Non-Fiction',
    description: 'A sweeping narrative of the history of humankind.',
    totalCopies: 2,
    borrowCount: 9
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '978-0061122415',
    genre: 'Fiction',
    description: 'A philosophical novel about following one\'s dreams.',
    totalCopies: 4,
    borrowCount: 11
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '978-0441172719',
    genre: 'Science Fiction',
    description: 'An epic science fiction novel set on the desert planet Arrakis.',
    totalCopies: 3,
    borrowCount: 14
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    isbn: '978-0544003415',
    genre: 'Fantasy',
    description: 'The epic fantasy trilogy that defined the genre.',
    totalCopies: 2,
    borrowCount: 20
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Connected to MongoDB');

    for (const bookData of dummyBooks) {
      const existingBook = await Book.findOne({ isbn: bookData.isbn });
      if (!existingBook) {
        const book = new Book(bookData);
        await book.save();
        console.log(`Added: ${book.title}`);
      } else {
        // Update existing book with borrowCount if it's different
        if (existingBook.borrowCount !== bookData.borrowCount) {
          existingBook.borrowCount = bookData.borrowCount;
          await existingBook.save();
          console.log(`Updated borrowCount for: ${bookData.title}`);
        } else {
          console.log(`Skipped (already exists): ${bookData.title}`);
        }
      }
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();