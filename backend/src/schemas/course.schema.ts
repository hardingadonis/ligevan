import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Course {
	@Prop({ required: true })
	code: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	thumbnail: string;

	@Prop({ required: true })
	price: number;

	@Prop({ default: true })
	isActive: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
