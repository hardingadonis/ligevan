import { Module } from '@nestjs/common';
import { CoursesService } from '@/domains/courses/courses.service';
import { CoursesController } from '@/domains/courses/courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from '@/schemas/course.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
	],
	controllers: [CoursesController],
	providers: [CoursesService],
	exports: [CoursesService],
})
export class CoursesModule {}
