import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminsService } from '@/domains/admins/admins.service';
import { verify } from '@/utils/hash.util';

@Injectable()
export class AuthAdminService {
	private readonly logger = new Logger(AuthAdminService.name);

	constructor(
		private readonly adminService: AdminsService,
		private readonly jwtService: JwtService,
	) {}

	async signIn(
		username: string,
		password: string,
	): Promise<{ access_token: string }> {
		const user = await this.adminService.getByUsernameWithPassword(username);

		if (!username || username.trim() === '') {
			this.logger.error('Username must be a non-empty string.');
			throw new BadRequestException('Username must be a non-empty string.');
		}

		if (!user) {
			this.logger.error(`Admin with username ${username} not found!`);
			throw new NotFoundException(`Admin with username ${username} not found!`);
		}

		if (!password || password.trim() === '') {
			this.logger.error('Password must be a non-empty string.');
			throw new BadRequestException('Password must be a non-empty string.');
		}

		this.logger.debug(`Hashed password from DB: ${user.hashedPassword}`);

		if (!user.hashedPassword || user.hashedPassword.trim() === '') {
			this.logger.error('Hashed password is invalid.');
			throw new InternalServerErrorException('Hashed password is invalid.');
		}

		const verifyPassword = await verify(user.hashedPassword, password);

		if (!verifyPassword) {
			this.logger.error('Invalid password.');
			throw new UnauthorizedException('Invalid password.');
		}

		this.logger.debug(`Admin with username ${username} found!`);

		const payload = { username: user.username, sub: user.id };

		this.logger.debug('Generating JWT token');

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
