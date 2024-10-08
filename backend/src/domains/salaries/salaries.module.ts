import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SalariesController } from '@/domains/salaries/salaries.controller';
import { SalariesService } from '@/domains/salaries/salaries.service';
import { SalarySchema } from '@/schemas/salary.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Salary', schema: SalarySchema }]),
	],
	controllers: [SalariesController],
	providers: [SalariesService],
	exports: [SalariesService],
})
export class SalariesModule {}
