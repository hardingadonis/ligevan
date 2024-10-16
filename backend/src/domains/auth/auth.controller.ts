import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@/domains/auth/auth.service';
import { AdminLoginDto } from '@/domains/auth/dto/auth.admin.dto';
import { TeacherLoginDto } from '@/domains/auth/dto/auth.teacher.dto';
import { AdminAuthGuard } from '@/domains/auth/guards/admin.guard';
import { TeacherAuthGuard } from '@/domains/auth/guards/teacher.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AdminAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('admin/login')
	@ApiBody({ type: AdminLoginDto })
	async adminLogin(@Request() req) {
		const token = await this.authService.login({
			sub: req.user.username,
			role: req.user.role,
		});

		return { access_token: token };
	}

	@UseGuards(TeacherAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('teacher/login')
	@ApiBody({ type: TeacherLoginDto })
	async teacherLogin(@Request() req) {
		const token = await this.authService.login({
			sub: req.user.email,
			role: req.user.role,
		});

		return { access_token: token };
	}
}
