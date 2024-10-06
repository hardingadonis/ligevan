import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Course {
	@Prop({ required: true, unique: true })
	code: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	thumbnail: string;

	@Prop({ required: true })
	price: number;

	@Prop({ default: false })
	isDeleted: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
