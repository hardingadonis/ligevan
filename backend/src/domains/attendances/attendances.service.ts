import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Attendance } from '@/schemas/attendance.schema';

@Injectable()
export class AttendancesService {
	private readonly logger = new Logger(AttendancesService.name);

	constructor(
		@InjectModel(Attendance.name)
		private readonly attendanceModel: Model<Attendance>,
	) {}
}
