import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import jwtConfig from '@/domains/auth/config/jwt.config';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		@Inject(jwtConfig.KEY)
		private jwtConfiguration: ConfigType<typeof jwtConfig>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfiguration.secret,
			ignoreExpiration: false,
		});
	}

	async validate(payload: any) {
		return payload;
	}
}
