import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaymentsService } from '@/domains/payments/payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}
}
