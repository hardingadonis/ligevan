import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StudentsService } from '@/domains/students/students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
	constructor(private readonly studentsService: StudentsService) {}
}
