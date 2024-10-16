import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import googleOauth2Config from '@/domains/auth/config/google-oauth2.config';

@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy, 'student') {
	constructor(
		@Inject(googleOauth2Config.KEY)
		private readonly googleConfiguration: ConfigType<typeof googleOauth2Config>,
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
		console.log(accessToken);
		console.log(refeshToken);
		console.log(profile);
	}
}
