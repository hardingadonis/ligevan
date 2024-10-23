import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Class {
	@Prop({ required: true })
	name: string;

	@Prop({ type: Types.ObjectId, ref: 'Center', required: true })
	center: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Course', required: true })
	course: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
	teacher: Types.ObjectId;

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Student', required: false })
	students: Types.ObjectId[];

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Slot', required: false })
	slots: Types.ObjectId[];

	@Prop({ default: false })
	isDeleted: boolean;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
