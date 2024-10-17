import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Center {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	address: string;

	@Prop({ required: true, unique: true })
	phone: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Course', required: false })
	courses: Types.ObjectId[];

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Voucher', required: false })
	vouchers: Types.ObjectId[];

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Teacher', required: false })
	teachers: Types.ObjectId[];

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Class', required: false })
	classes: Types.ObjectId[];

	@Prop({ default: false })
	isDeleted: boolean;
}

export const CenterSchema = SchemaFactory.createForClass(Center);
