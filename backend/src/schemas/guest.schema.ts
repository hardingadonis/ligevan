import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Guest {
	@Prop({ required: true })
	fullName: string;

	@Prop({ unique: true, required: true })
	cardNo: string;

	@Prop({ required: true })
	hashedPassword: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
