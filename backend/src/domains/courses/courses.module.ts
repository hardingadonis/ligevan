import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Module({
	providers: [CoursesService],
})
export class CoursesModule {}
