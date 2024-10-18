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

	@Prop({ required: true })
	phone: string;

	@Prop({ required: true })
	address: string;

	@Prop({ required: true, default: 'https://teacher_avatar.png' })
	avatar: string;

	@Prop({ required: true })
	gender: 'male' | 'female';

	@Prop({ required: true })
	dob: Date;

	@Prop({ type: Types.ObjectId, ref: 'Center', required: true })
	center: Types.ObjectId;

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Class', required: false })
	classes: Types.ObjectId[];

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Salary', required: false })
	salaries: Types.ObjectId[];

	@Prop({ default: false })
	isDeleted: boolean;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
