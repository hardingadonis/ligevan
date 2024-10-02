import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Voucher {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	value: number;

	@Prop({ required: true })
	due: Date;
}
