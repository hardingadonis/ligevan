import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student {
	@Prop({ required: true })
	fullName: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	phone: string;

	@Prop({ required: true })
	address: string;

	@Prop({ required: true, default: 'https://student_avatar.png' })
	avatar: string;

	@Prop({ required: true })
	gender: 'male' | 'female';

	@Prop({ required: true })
	dob: Date;

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Class', required: false })
	classes: Types.ObjectId[];

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Payment', required: false })
	payments: Types.ObjectId[];

	@Prop({ default: false })
	isDeleted: boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
