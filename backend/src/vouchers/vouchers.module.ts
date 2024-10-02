import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
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
