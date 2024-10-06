import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Teacher {
	@Prop({ required: true })
	fullName: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	hashedPassword: string;

	@Prop({ required: true, unique: true })
	phone: string;

	@Prop({ required: true })
	address: string;

	@Prop({ default: 'https://teacher_avatar.png' })
	avatar: string;

	@Prop({ required: true })
	gender: string;

	@Prop({ required: true })
	dob: Date;

	@Prop({ default: 0 })
	salary: number;

	@Prop({ type: Types.ObjectId, ref: 'Center', required: true })
	center: Types.ObjectId;

	@Prop({ default: false })
	isDeleted: boolean;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
