import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from '@/utils/hash.util';
import { AdminsService } from '@/domains/admins/admins.service';

@Injectable()
export class AuthAdminService {
	private readonly logger = new Logger(AuthAdminService.name);

	constructor(
		private adminService: AdminsService,
		private jwtService: JwtService,
	) {}

	async signIn(
		username: string,
		password: string,
	): Promise<{ access_token: string }> {
		const user = await this.adminService.getByUsername(username);

		if (!user) {
			this.logger.error(`Admin with username ${username} not found!`);

			throw new NotFoundException(`Admin with username ${username} not found!`);
		}

		const verifyPassword = await verify(user.hashedPassword, password);

		if (!verifyPassword) {
			this.logger.error(
				`Invalid password for admin with username ${username}!`,
			);

			throw new NotFoundException(
				`Invalid password for admin with username ${username}!`,
			);
		}

		const payload = { username: user.username, sub: user._id };

		this.logger.debug('Generating JWT token');

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
