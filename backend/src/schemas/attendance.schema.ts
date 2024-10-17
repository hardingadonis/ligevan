import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Attendance {
	@Prop({ type: Types.ObjectId, ref: 'Student', required: true })
	student: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Slot', required: true })
	slot: Types.ObjectId;

	@Prop({ required: true, default: 'not-yet' })
	status: 'attended' | 'absent' | 'not-yet';
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
