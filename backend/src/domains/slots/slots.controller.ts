import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateSlotDto, UpdateSlotDto } from '@/domains/slots/dto/slot.dto';
import { SlotsService } from '@/domains/slots/slots.service';

@ApiTags('Slots')
@Controller('slots')
export class SlotsController {
	constructor(private readonly slotsService: SlotsService) {}

	@Post()
	async create(@Body() createSlotDto: CreateSlotDto) {
		return await this.slotsService.create(createSlotDto);
	}

	@Get()
	async getAll() {
		return await this.slotsService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.slotsService.getById(id);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() updateSlotDto: UpdateSlotDto) {
		return await this.slotsService.update(id, updateSlotDto);
	}

	@Post('find-list-slot')
	async findSlotsInRange(
		@Body() body: { classId: string; start: Date; end: Date },
	) {
		return await this.slotsService.findSlotsInRange(
			body.classId,
			body.start,
			body.end,
		);
	}
}
