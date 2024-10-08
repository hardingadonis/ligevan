import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Slot {
	@Prop({ type: Types.ObjectId, ref: 'Class', required: true })
	class: Types.ObjectId;

	@Prop({ required: true })
	room: string;

	@Prop({ required: true })
	start: Date;

	@Prop({ required: true })
	end: Date;

	@Prop({
		type: Types.Array<Types.ObjectId>,
		ref: 'Attendance',
		required: false,
	})
	attendances: Types.ObjectId[];

	@Prop({ default: false })
	isDone: boolean;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
