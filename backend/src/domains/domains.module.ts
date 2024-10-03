import { Module } from '@nestjs/common';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [VouchersModule],
})
export class DomainsModule {}
