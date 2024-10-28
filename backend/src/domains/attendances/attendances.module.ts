import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AttendancesController } from '@/domains/attendances/attendances.controller';
import { AttendancesService } from '@/domains/attendances/attendances.service';
import { SlotsService } from '@/domains/slots/slots.service';
import { AttendanceSchema } from '@/schemas/attendance.schema';
import { SlotSchema } from '@/schemas/slot.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Attendance', schema: AttendanceSchema },
			{ name: 'Slot', schema: SlotSchema },
		]),
	],
	controllers: [AttendancesController],
	providers: [AttendancesService, SlotsService],
	exports: [AttendancesService],
})
export class AttendancesModule {}
