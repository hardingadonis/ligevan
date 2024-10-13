import { AdminsModule } from '../admins/admins.module';
import { Module } from '@nestjs/common';

import { AuthController } from '@/domains/auth/auth.controller';
import { AuthService } from '@/domains/auth/auth.service';
import { AdminStrategy } from '@/domains/auth/strategies/admin.strategy';
import { TeacherStrategy } from '@/domains/auth/strategies/teacher.strategy';
import { TeachersModule } from '@/domains/teachers/teachers.module';

@Module({
	imports: [AdminsModule, TeachersModule],
	controllers: [AuthController],
	providers: [AuthService, AdminStrategy, TeacherStrategy],
})
export class AuthModule {}
