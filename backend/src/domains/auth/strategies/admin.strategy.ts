import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@/domains/auth/auth.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'username' });
	}

	async validate(username: string, password: string) {
		return this.authService.validateAdmin(username, password);
	}
}
