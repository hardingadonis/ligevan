import { Module } from '@nestjs/common';

import { AdminsModule } from '@/domains/admins/admins.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { CentersModule } from '@/domains/centers/centers.module';
import { CoursesModule } from '@/domains/courses/courses.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [
		VouchersModule,
		AdminsModule,
		AuthModule,
		CoursesModule,
		CentersModule,
	],
})
export class DomainsModule {}
