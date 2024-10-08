import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment {
	@Prop({ type: Types.ObjectId, ref: 'Student', required: true })
	student: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Course', required: true })
	course: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Class', required: true })
	class: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Voucher', required: false })
	voucher: Types.ObjectId;

	@Prop({ required: true })
	originPrice: number;

	@Prop({ required: true })
	finalPrice: number;

	@Prop({ required: true })
	method: 'vn-pay' | 'momo' | 'zalo-pay';
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
