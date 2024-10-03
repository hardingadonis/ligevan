import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { VouchersService } from '@/vouchers/vouchers.service';
import { CreateVoucherDto, UpdateVoucherDto } from '@/vouchers/dto/voucher.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VouchersController {
	constructor(private readonly vouchersService: VouchersService) {}

	@Post()
	async createVoucher(@Body() createVoucherDto: CreateVoucherDto) {
		return await this.vouchersService.createVoucher(createVoucherDto);
	}

	@Get()
	async getAllVouchers() {
		return await this.vouchersService.getAllVouchers();
	}

	@Get(':code')
	async getVoucherByCode(@Param('code') code: string) {
		return await this.vouchersService.getVoucherByCode(code);
	}

	@Put(':id')
	async updateVoucher(
		@Param('id') id: string,
		@Body() updateVoucherDto: UpdateVoucherDto,
	) {
		return await this.vouchersService.updateVoucher(id, updateVoucherDto);
	}

	@Delete(':id')
	async deleteVoucher(@Param('id') id: string) {
		return await this.vouchersService.deleteVoucher(id);
	}
}
