import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Salary {
	@Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
	teacher: Types.ObjectId;

	@Prop({ required: true })
	start: Date;

	@Prop({ required: true })
	end: Date;

	@Prop({ required: true })
	finalSalary: number;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);
