"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    description: { type: String },
    availableCopies: { type: Number, required: true, default: 1 },
    totalCopies: { type: Number, required: true, default: 1 },
    borrowCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Book', bookSchema);
