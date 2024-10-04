import { Module } from '@nestjs/common';
import { VouchersService } from '@/domains/vouchers/vouchers.service';
import { VouchersController } from '@/domains/vouchers/vouchers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherSchema } from 'src/schemas/voucher.schema';

@Module({
	controllers: [VouchersController],
	providers: [VouchersService],
	imports: [
		MongooseModule.forFeature([{ name: 'Voucher', schema: VoucherSchema }]),
	],
})
export class VouchersModule {}
