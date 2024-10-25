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
	ChangePasswordDto,
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

	@Get('/email/:email')
	async getByEmail(@Param('email') email: string) {
		return await this.teachersService.getByEmail(email);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateTeacherDto: UpdateTeacherDto,
	) {
		return await this.teachersService.update(id, updateTeacherDto);
	}

	@Put(':email/change-password')
	async changePassword(
		@Param('email') email: string,
		@Body() changePasswordDto: ChangePasswordDto,
	) {
		return await this.teachersService.changePassword(email, changePasswordDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.teachersService.delete(id);
	}
}
