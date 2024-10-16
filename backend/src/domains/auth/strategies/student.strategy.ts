import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { AuthService } from '@/domains/auth/auth.service';
import googleOauth2Config from '@/domains/auth/config/google-oauth2.config';

@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy, 'student') {
	constructor(
		@Inject(googleOauth2Config.KEY)
		private readonly googleConfiguration: ConfigType<typeof googleOauth2Config>,
		private readonly authService: AuthService,
	) {
		super({
			clientID: googleConfiguration.clientID,
			clientSecret: googleConfiguration.clientSecret,
			callbackURL: googleConfiguration.callbackURL,
			scope: ['email', 'profile'],
		});
	}

	async validate(
		accessToken: string,
		refeshToken: string,
		profile: any,
		done: VerifyCallback,
	) {
		const student = await this.authService.validateStudent({
			fullName: profile.displayName,
			email: profile.emails[0].value,
			phone: '0000000000',
			address: 'Viet Nam',
			avatar: profile.photos[0].value,
			gender: 'male',
			dob: new Date(),
			classes: [],
			payments: [],
		});

		done(null, student);
	}
}
