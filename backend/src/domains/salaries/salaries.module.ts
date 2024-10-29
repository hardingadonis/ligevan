import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SalariesController } from '@/domains/salaries/salaries.controller';
import { SalariesService } from '@/domains/salaries/salaries.service';
import { SlotsService } from '@/domains/slots/slots.service';
import { ClassSchema } from '@/schemas/class.schema';
import { CourseSchema } from '@/schemas/course.schema';
import { SalarySchema } from '@/schemas/salary.schema';
import { SlotSchema } from '@/schemas/slot.schema';
import { TeacherSchema } from '@/schemas/teacher.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Salary', schema: SalarySchema },
			{ name: 'Class', schema: ClassSchema },
			{ name: 'Course', schema: CourseSchema },
			{ name: 'Slot', schema: SlotSchema },
			{ name: 'Teacher', schema: TeacherSchema },
		]),
	],
	controllers: [SalariesController],
	providers: [SalariesService, SlotsService],
	exports: [SalariesService],
})
export class SalariesModule {}
