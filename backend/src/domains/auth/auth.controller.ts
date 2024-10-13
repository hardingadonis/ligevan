import { Controller } from '@nestjs/common';

import { AuthService } from '@/domains/auth/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
}
