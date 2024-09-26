import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from './category.schema';

@Schema()
export class BookDetail {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	isbn: Array<string>;

	@Prop({ required: true })
	author: string;

	@Prop({ required: true })
	publishedYear: number;

	@Prop({ required: true })
	publisher: string;

	@Prop({ required: false })
	edition: string;

	@Prop({ required: false })
	coverBook: string;

	@Prop({ required: true })
	categories: Category[];
}

export const BookDetailSchema = SchemaFactory.createForClass(BookDetail);
