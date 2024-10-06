import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthAdminService } from '@/domains/auth/admin/auth.admin.service';
import { AdminLoginDto } from '@/domains/auth/admin/dto/login.dto';
import { Public } from '@/domains/auth/auth.guard';

@ApiTags('Auth/Admin')
@Controller('auth/admin')
export class AuthAdminController {
	constructor(private readonly authAdminService: AuthAdminService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(@Body() adminLoginDto: AdminLoginDto) {
		return await this.authAdminService.signIn(
			adminLoginDto.username,
			adminLoginDto.password,
		);
	}
}
