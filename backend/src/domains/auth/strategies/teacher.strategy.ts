import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@/domains/auth/auth.service';

@Injectable()
export class TeacherStrategy extends PassportStrategy(Strategy, 'teacher') {
	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string) {
		return this.authService.validateTeacher(email, password);
	}
}
