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
	CalculateSalaryDto,
	CreateSalaryDto,
	UpdateSalaryDto,
} from '@/domains/salaries/dto/salary.dto';
import { SalariesService } from '@/domains/salaries/salaries.service';

@ApiTags('Salaries')
@Controller('salaries')
export class SalariesController {
	constructor(private readonly salariesService: SalariesService) {}

	@Post()
	async create(@Body() createSalaryDto: CreateSalaryDto) {
		return await this.salariesService.create(createSalaryDto);
	}

	@Post('calculate')
	async calculate(@Body() calculateSalaryDto: CalculateSalaryDto) {
		return await this.salariesService.calculate(calculateSalaryDto);
	}

	@Get()
	async getAll() {
		return await this.salariesService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.salariesService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateSalaryDto: UpdateSalaryDto,
	) {
		return await this.salariesService.update(id, updateSalaryDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.salariesService.delete(id);
	}
}
