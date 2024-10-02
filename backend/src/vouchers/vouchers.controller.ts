import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto, UpdateVoucherDto } from './dto/voucher.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VouchersController {
	constructor(private readonly vouchersService: VouchersService) {}

	@Post()
	createVoucher(@Body() createVoucherDto: CreateVoucherDto) {
		return this.vouchersService.createVoucher(createVoucherDto);
	}

	@Get()
	getAllVouchers() {
		return this.vouchersService.getAllVouchers();
	}

	@Get(':code')
	getVoucherByCode(@Param('code') code: string) {
		return this.vouchersService.getVoucherByCode(code);
	}

	@Put(':id')
	updateVoucher(
		@Param('id') id: string,
		@Body() updateVoucherDto: UpdateVoucherDto,
	) {
		return this.vouchersService.updateVoucher(id, updateVoucherDto);
	}

	@Delete(':id')
	deleteVoucher(@Param('id') id: string) {
		return this.vouchersService.deleteVoucher(id);
	}
}
