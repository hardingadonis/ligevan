import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CoursesService } from '@/domains/courses/courses.service';
import {
	CreateCourseDto,
	UpdateCourseDto,
} from '@/domains/courses/dto/course.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@Post()
	async create(@Body() createCourseDto: CreateCourseDto) {
		return await this.coursesService.create(createCourseDto);
	}

	@Get()
	async getAll() {
		return await this.coursesService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.coursesService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCourseDto: UpdateCourseDto,
	) {
		return await this.coursesService.update(id, updateCourseDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.coursesService.delete(id);
	}
}
