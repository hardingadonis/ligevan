import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Guest } from './guest.schema';
import { Book } from './book.schema';
import { Librarian } from './librarian.schema';

@Schema()
export class BorrowHistory {
	@Prop({ required: true })
	guest: Guest;

	@Prop({ required: true })
	book: Book;

	@Prop({ required: true })
	librarian: Librarian;

	@Prop({ required: true })
	borrowDate: Date;

	@Prop({ required: true })
	dueDate: Date;

	@Prop({ required: true })
	status: string;
}

export const BorrowHistorySchema = SchemaFactory.createForClass(BorrowHistory);
