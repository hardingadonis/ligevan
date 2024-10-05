import { Module } from '@nestjs/common';
import { AdminsModule } from '@/domains/admins/admins.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { CentersModule } from '@/domains/centers/centers.module';
import { CoursesModule } from './courses/courses.module';

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
