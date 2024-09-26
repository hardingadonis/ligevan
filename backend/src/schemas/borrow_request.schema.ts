import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Guest } from './guest.schema';
import { Book } from './book.schema';

@Schema()
export class BorrowRequest {
	@Prop({ required: true })
	guest: Guest;

	@Prop({ required: true })
	book: Book;

	@Prop({ required: true })
	status: string;
}

export const BorrowRequestSchema = SchemaFactory.createForClass(BorrowRequest);
