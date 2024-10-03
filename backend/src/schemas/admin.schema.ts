import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Admin {
	@Prop({ required: true })
	fullName: string;

	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true })
	hashedPassword: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
