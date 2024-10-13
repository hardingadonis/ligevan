import { Module } from '@nestjs/common';

import { AuthController } from '@/domains/auth/auth.controller';
import { AuthService } from '@/domains/auth/auth.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
