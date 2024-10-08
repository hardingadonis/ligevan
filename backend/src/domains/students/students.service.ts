import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Student } from '@/schemas/student.schema';

@Injectable()
export class StudentsService {
	private readonly logger = new Logger(StudentsService.name);

	constructor(
		@InjectModel(Student.name) private readonly studentModel: Model<Student>,
	) {}
}
