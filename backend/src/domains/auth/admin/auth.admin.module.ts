import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AdminsModule } from '@/domains/admins/admins.module';
import { AuthAdminController } from '@/domains/auth/admin/auth.admin.controller';
import { AuthAdminService } from '@/domains/auth/admin/auth.admin.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		AdminsModule,
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '60s' },
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthAdminController],
	providers: [AuthAdminService],
})
export class AuthAdminModule {}
