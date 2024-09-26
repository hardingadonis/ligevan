import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Librarian {
	@Prop({ required: true })
	fullName: string;

	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ required: true })
	hashedPassword: string;

	@Prop({ default: false })
	isAdmin?: boolean;
}

export const LibrarianSchema = SchemaFactory.createForClass(Librarian);
