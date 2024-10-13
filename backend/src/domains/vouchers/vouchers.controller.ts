import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	CreateVoucherDto,
	UpdateVoucherDto,
} from '@/domains/vouchers/dto/voucher.dto';
import { VouchersService } from '@/domains/vouchers/vouchers.service';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VouchersController {
	constructor(private readonly vouchersService: VouchersService) {}

	@Post()
	async create(@Body() createVoucherDto: CreateVoucherDto) {
		return await this.vouchersService.create(createVoucherDto);
	}

	@Get()
	async getAll() {
		return await this.vouchersService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.vouchersService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateVoucherDto: UpdateVoucherDto,
	) {
		return await this.vouchersService.update(id, updateVoucherDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.vouchersService.delete(id);
	}
}
