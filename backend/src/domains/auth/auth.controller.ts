import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AdminLoginDto } from '@/domains/auth/dto/auth.admin.dto';
import { TeacherLoginDto } from '@/domains/auth/dto/auth.teacher.dto';
import { AdminAuthGuard } from '@/domains/auth/guards/admin.guard';
import { TeacherAuthGuard } from '@/domains/auth/guards/teacher.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	@UseGuards(AdminAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('admin/login')
	@ApiBody({ type: AdminLoginDto })
	async adminLogin(@Request() req) {
		return await req.user;
	}

	@UseGuards(TeacherAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('teacher/login')
	@ApiBody({ type: TeacherLoginDto })
	async adminTeacher(@Request() req) {
		return await req.user;
	}
}
