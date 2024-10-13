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
import { AdminAuthGuard } from '@/domains/auth/guards/admin.guard';

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
}
