import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AttendancesService } from '@/domains/attendances/attendances.service';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
	constructor(private readonly attendancesService: AttendancesService) {}
}
