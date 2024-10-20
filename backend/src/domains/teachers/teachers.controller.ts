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
	CreateTeacherDto,
	UpdateTeacherDto,
} from '@/domains/teachers/dto/teacher.dto';
import { TeachersService } from '@/domains/teachers/teachers.service';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) {}

	@Post()
	async create(@Body() createTeacherDto: CreateTeacherDto) {
		return await this.teachersService.create(createTeacherDto);
	}

	@Get()
	async getAll() {
		return await this.teachersService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.teachersService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateTeacherDto: UpdateTeacherDto,
	) {
		return await this.teachersService.update(id, updateTeacherDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.teachersService.delete(id);
	}
}
