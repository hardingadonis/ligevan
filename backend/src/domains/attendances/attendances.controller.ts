import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AttendancesService } from '@/domains/attendances/attendances.service';
import {
	CreateAttendanceDto,
	UpdateAttendanceDto,
} from '@/domains/attendances/dto/attendance.dto';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
	constructor(private readonly attendancesService: AttendancesService) {}

	@Post()
	async create(@Body() createAttendanceDto: CreateAttendanceDto) {
		return await this.attendancesService.create(createAttendanceDto);
	}

	@Get()
	async getAll() {
		return await this.attendancesService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.attendancesService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateAttendanceDto: UpdateAttendanceDto,
	) {
		return await this.attendancesService.update(id, updateAttendanceDto);
	}
}
