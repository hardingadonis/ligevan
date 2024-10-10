import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthAdminModule } from '@/domains/auth/admin/auth.admin.module';
import googleOauth2Config from '@/domains/auth/config/google-oauth2.config';

@Module({
	imports: [ConfigModule.forFeature(googleOauth2Config), AuthAdminModule],
})
export class AuthModule {}
