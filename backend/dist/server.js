"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const books_1 = __importDefault(require("./routes/books"));
const borrowings_1 = __importDefault(require("./routes/borrowings"));
const users_1 = __importDefault(require("./routes/users"));
const Book_1 = __importDefault(require("./models/Book"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes (must be before static files)
app.use('/api/auth', auth_1.default);
app.use('/api/books', books_1.default);
app.use('/api/borrowings', borrowings_1.default);
app.use('/api/users', users_1.default);
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
            const existingBook = await Book_1.default.findOne({ isbn: bookData.isbn });
            if (!existingBook) {
                const book = new Book_1.default(bookData);
                await book.save();
            }
        }
        res.json({ message: 'Dummy books added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Serve static files from React build
const frontendPath = path_1.default.join(__dirname, '../../frontend/dist');
app.use(express_1.default.static(frontendPath));
// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(frontendPath, 'index.html'));
});
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend served from: ${frontendPath}`);
});
