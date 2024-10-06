import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoursesController } from '@/domains/courses/courses.controller';
import { CoursesService } from '@/domains/courses/courses.service';
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
