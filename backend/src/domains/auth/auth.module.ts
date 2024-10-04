import { Module } from '@nestjs/common';
import { AuthAdminModule } from '@/domains/auth/admin/auth.admin.module';

@Module({
	imports: [AuthAdminModule],
})
export class AuthModule {}
