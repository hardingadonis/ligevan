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

	@Post('create-all/:slotId')
	async createAttendancesForSlot(
		@Param('slotId') slotId: string,
		@Body() listStudentId: string[],
	) {
		return this.attendancesService.createAttendancesForSlot(
			slotId,
			listStudentId,
		);
	}

	@Put('/check-attendances/:slotId')
	async updateAttendance(
		@Param('slotId') slotId: string,
		@Body() attendanceUpdates: UpdateAttendanceDto[],
	) {
		return await this.attendancesService.updateAttendance(
			slotId,
			attendanceUpdates.map((update) => ({
				studentId: update.student,
				status: update.status,
			})),
		);
	}
}
