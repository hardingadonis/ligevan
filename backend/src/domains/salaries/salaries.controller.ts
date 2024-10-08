import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SalariesService } from '@/domains/salaries/salaries.service';

@ApiTags('Salaries')
@Controller('salaries')
export class SalariesController {
	constructor(private readonly salariesService: SalariesService) {}
}
