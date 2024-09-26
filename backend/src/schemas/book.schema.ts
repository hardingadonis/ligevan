import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookDetail } from './book_detail.schema';

@Schema()
export class Book {
	@Prop({ required: true })
	bookDetail: BookDetail;

	@Prop({ required: true })
	bookCode: string;

	@Prop({ required: true })
	bookStatus: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
