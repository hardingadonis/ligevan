import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Guest } from './guest.schema';
import { Book } from './book.schema';
import mongoose from 'mongoose';

@Schema()
export class BorrowRequest {
	@Prop({ type: mongoose.Types.ObjectId, ref: 'Guest', required: true })
	guest: Guest;

	@Prop({ type: mongoose.Types.ObjectId, ref: 'Book', required: true })
	book: Book;

	@Prop({ required: true })
	status: string;
}

export const BorrowRequestSchema = SchemaFactory.createForClass(BorrowRequest);
