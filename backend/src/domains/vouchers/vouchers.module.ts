import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VouchersController } from '@/domains/vouchers/vouchers.controller';
import { VouchersService } from '@/domains/vouchers/vouchers.service';
import { VoucherSchema } from '@/schemas/voucher.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Voucher', schema: VoucherSchema }]),
	],
	controllers: [VouchersController],
	providers: [VouchersService],
	exports: [VouchersService],
})
export class VouchersModule {}
