"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Borrowing_1 = __importDefault(require("../models/Borrowing"));
const Book_1 = __importDefault(require("../models/Book"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Borrow a book (student/librarian)
router.post('/borrow', auth_1.authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user._id;
        const book = await Book_1.default.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: 'Book not available' });
        }
        // Check if user already has this book borrowed
        const existingBorrowing = await Borrowing_1.default.findOne({
            userId,
            bookId,
            status: 'borrowed'
        });
        if (existingBorrowing) {
            return res.status(400).json({ message: 'You already have this book borrowed' });
        }
        // Calculate due date (14 days from now)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        const borrowing = new Borrowing_1.default({
            userId,
            bookId,
            dueDate
        });
        await borrowing.save();
        // Update book
        book.availableCopies -= 1;
        book.borrowCount += 1;
        await book.save();
        res.status(201).json(borrowing);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Return a book (librarian/admin)
router.post('/return/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['librarian', 'admin']), async (req, res) => {
    try {
        const borrowing = await Borrowing_1.default.findById(req.params.id);
        if (!borrowing) {
            return res.status(404).json({ message: 'Borrowing record not found' });
        }
        if (borrowing.status !== 'borrowed') {
            return res.status(400).json({ message: 'Book already returned' });
        }
        borrowing.returnDate = new Date();
        borrowing.status = 'returned';
        await borrowing.save();
        // Update book
        const book = await Book_1.default.findById(borrowing.bookId);
        if (book) {
            book.availableCopies += 1;
            await book.save();
        }
        res.json(borrowing);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Get user's borrowings
router.get('/my', auth_1.authenticateToken, async (req, res) => {
    try {
        const borrowings = await Borrowing_1.default.find({ userId: req.user._id })
            .populate('bookId')
            .sort({ borrowDate: -1 });
        res.json(borrowings);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Get all borrowings (librarian/admin)
router.get('/', auth_1.authenticateToken, (0, auth_1.requireRole)(['librarian', 'admin']), async (req, res) => {
    try {
        const borrowings = await Borrowing_1.default.find()
            .populate('userId', 'name email')
            .populate('bookId', 'title author')
            .sort({ borrowDate: -1 });
        res.json(borrowings);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
