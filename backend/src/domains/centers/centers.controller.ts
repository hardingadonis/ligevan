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

import { CentersService } from '@/domains/centers/centers.service';
import {
	CreateCenterDto,
	UpdateCenterDto,
} from '@/domains/centers/dto/center.dto';

@ApiTags('Centers')
@Controller('centers')
export class CentersController {
	constructor(private readonly centersService: CentersService) {}

	@Post()
	async create(@Body() createCenterDto: CreateCenterDto) {
		return await this.centersService.create(createCenterDto);
	}

	@Get()
	async getAll() {
		return await this.centersService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.centersService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCenterDto: UpdateCenterDto,
	) {
		return await this.centersService.update(id, updateCenterDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.centersService.delete(id);
	}
}
