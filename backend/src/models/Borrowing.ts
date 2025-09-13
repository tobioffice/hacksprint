import mongoose, { Document } from 'mongoose';

export interface IBorrowing extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'borrowed' | 'returned' | 'overdue';
}

const borrowingSchema = new mongoose.Schema<IBorrowing>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed' }
});

export default mongoose.model<IBorrowing>('Borrowing', borrowingSchema);