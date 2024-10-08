import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Salary } from '@/schemas/salary.schema';

@Injectable()
export class SalariesService {
	private readonly logger = new Logger(SalariesService.name);

	constructor(
		@InjectModel(Salary.name) private readonly salaryModel: Model<Salary>,
	) {}
}
