import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';

@Module({
	providers: [VouchersService],
})
export class VouchersModule {}
