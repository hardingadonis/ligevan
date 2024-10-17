import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	CreatePaymentDto,
	UpdatePaymentDto,
} from '@/domains/payments/dto/payment.dto';
import { PaymentsService } from '@/domains/payments/payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@Post()
	async create(@Body() createPaymentDto: CreatePaymentDto) {
		return await this.paymentsService.create(createPaymentDto);
	}

	@Get()
	async getAll() {
		return await this.paymentsService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.paymentsService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updatePaymentDto: UpdatePaymentDto,
	) {
		return await this.paymentsService.update(id, updatePaymentDto);
	}
}
