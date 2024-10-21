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

import {
	CreateStudentDto,
	UpdateStudentDto,
} from '@/domains/students/dto/student.dto';
import { StudentsService } from '@/domains/students/students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
	constructor(private readonly studentsService: StudentsService) {}

	@Post()
	async create(@Body() createStudentDto: CreateStudentDto) {
		return await this.studentsService.create(createStudentDto);
	}

	@Get()
	async getAll() {
		return await this.studentsService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.studentsService.getById(id);
	}

	@Get('/email/:email')
	async getByEmail(@Param('email') email: string) {
		return await this.studentsService.getByEmail(email);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateStudentDto: UpdateStudentDto,
	) {
		return await this.studentsService.update(id, updateStudentDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.studentsService.delete(id);
	}
}
