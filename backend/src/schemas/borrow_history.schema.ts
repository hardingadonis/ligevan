import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Guest } from './guest.schema';
import { Book } from './book.schema';
import { Librarian } from './librarian.schema';
import mongoose from 'mongoose';

@Schema()
export class BorrowHistory {
	@Prop({ type: mongoose.Types.ObjectId, ref: 'Guest', required: true })
	guest: Guest;

	@Prop({ type: mongoose.Types.ObjectId, ref: 'Book', required: true })
	book: Book;

	@Prop({ type: mongoose.Types.ObjectId, ref: 'Librarian', required: true })
	librarian: Librarian;

	@Prop({ required: true })
	borrowDate: Date;

	@Prop({ required: true })
	dueDate: Date;

	@Prop({ required: true })
	status: string;
}

export const BorrowHistorySchema = SchemaFactory.createForClass(BorrowHistory);
