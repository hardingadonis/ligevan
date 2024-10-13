import { AdminsModule } from '../admins/admins.module';
import { Module } from '@nestjs/common';

import { AuthController } from '@/domains/auth/auth.controller';
import { AuthService } from '@/domains/auth/auth.service';
import { AdminStrategy } from '@/domains/auth/strategies/admin.strategy';

@Module({
	imports: [AdminsModule],
	controllers: [AuthController],
	providers: [AuthService, AdminStrategy],
})
export class AuthModule {}
