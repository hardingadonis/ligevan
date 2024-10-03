import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Voucher {
	@Prop({ required: true, unique: true })
	code: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	value: number;

	@Prop({ required: true })
	start: Date;

	@Prop({ required: true })
	end: Date;

	@Prop({ default: false })
	isDeleted: boolean;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
