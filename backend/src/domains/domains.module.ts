import { Module } from '@nestjs/common';

import { AdminsModule } from '@/domains/admins/admins.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { CentersModule } from '@/domains/centers/centers.module';
import { ClassesModule } from '@/domains/classes/classes.module';
import { CoursesModule } from '@/domains/courses/courses.module';
import { StudentsModule } from '@/domains/students/students.module';
import { TeachersModule } from '@/domains/teachers/teachers.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [
		AdminsModule,
		AuthModule,
		CoursesModule,
		CentersModule,
		ClassesModule,
		TeachersModule,
		StudentsModule,
		VouchersModule,
	],
})
export class DomainsModule {}
