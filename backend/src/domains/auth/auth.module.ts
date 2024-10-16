import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AdminsModule } from '@/domains/admins/admins.module';
import { AuthController } from '@/domains/auth/auth.controller';
import { AuthService } from '@/domains/auth/auth.service';
import googleOauth2Config from '@/domains/auth/config/google-oauth2.config';
import jwtConfig from '@/domains/auth/config/jwt.config';
import { AdminStrategy } from '@/domains/auth/strategies/admin.strategy';
import { JWTStrategy } from '@/domains/auth/strategies/jwt.strategy';
import { TeacherStrategy } from '@/domains/auth/strategies/teacher.strategy';
import { TeachersModule } from '@/domains/teachers/teachers.module';

@Module({
	imports: [
		ConfigModule.forFeature(jwtConfig),
		ConfigModule.forFeature(googleOauth2Config),
		JwtModule.registerAsync(jwtConfig.asProvider()),
		AdminsModule,
		TeachersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, AdminStrategy, JWTStrategy, TeacherStrategy],
})
export class AuthModule {}
