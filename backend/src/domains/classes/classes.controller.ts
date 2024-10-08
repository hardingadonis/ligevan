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

import { ClassesService } from '@/domains/classes/classes.service';
import {
	CreateClassDto,
	UpdateClassDto,
} from '@/domains/classes/dto/class.dto';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
	constructor(private readonly classesService: ClassesService) {}

	@Post()
	async create(@Body() createClassDto: CreateClassDto) {
		return await this.classesService.create(createClassDto);
	}

	@Get()
	async getAll() {
		return await this.classesService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.classesService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateClassDto: UpdateClassDto,
	) {
		return await this.classesService.update(id, updateClassDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.classesService.delete(id);
	}
}
