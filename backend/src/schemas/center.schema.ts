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

	@Prop({ type: Types.ObjectId, ref: 'Course', required: false })
	courses: Types.ObjectId[];

	@Prop({ type: Types.ObjectId, ref: 'Voucher', required: false })
	vouchers: Types.ObjectId[];

	@Prop({ default: false })
	isDeleted: boolean;
}

export const CenterSchema = SchemaFactory.createForClass(Center);
