"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all users (admin only)
router.get('/', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Create user (admin only)
router.post('/', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword, role: role || 'student' });
        await user.save();
        const userResponse = { id: user._id, name: user.name, email: user.email, role: user.role };
        res.status(201).json(userResponse);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Update user (admin only)
router.put('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if email is being changed and if it's unique
        if (email !== user.email) {
            const existingUser = await User_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }
        user.name = name;
        user.email = email;
        user.role = role;
        await user.save();
        const userResponse = { id: user._id, name: user.name, email: user.email, role: user.role };
        res.json(userResponse);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Delete user (admin only)
router.delete('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
