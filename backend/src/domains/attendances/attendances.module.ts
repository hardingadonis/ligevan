import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AttendancesController } from '@/domains/attendances/attendances.controller';
import { AttendancesService } from '@/domains/attendances/attendances.service';
import { AttendanceSchema } from '@/schemas/attendance.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Attendance', schema: AttendanceSchema },
		]),
	],
	controllers: [AttendancesController],
	providers: [AttendancesService],
	exports: [AttendancesService],
})
export class AttendancesModule {}
