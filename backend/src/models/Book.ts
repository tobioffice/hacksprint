import mongoose, { Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  description: string;
  availableCopies: number;
  totalCopies: number;
  borrowCount: number;
  createdAt: Date;
}

const bookSchema = new mongoose.Schema<IBook>({
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

export default mongoose.model<IBook>('Book', bookSchema);