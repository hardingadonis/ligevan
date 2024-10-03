import { Module } from '@nestjs/common';
import { AdminsModule } from '@/domains/admins/admins.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [VouchersModule, AdminsModule],
})
export class DomainsModule {}
