import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SlotsService } from '@/domains/slots/slots.service';

@ApiTags('Slots')
@Controller('slots')
export class SlotsController {
	constructor(private readonly slotsService: SlotsService) {}
}
