import { Module } from '@nestjs/common';
import { AdminsModule } from '@/domains/admins/admins.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { CentersModule } from '@/domains/centers/centers.module';

@Module({
	imports: [
		VouchersModule,
		AdminsModule,
		AuthModule,
		VouchersModule,
		CentersModule,
	],
})
export class DomainsModule {}
