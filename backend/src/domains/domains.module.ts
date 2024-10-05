import { Module } from '@nestjs/common';

import { AdminsModule } from '@/domains/admins/admins.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [VouchersModule, AdminsModule, AuthModule, VouchersModule],
})
export class DomainsModule {}
