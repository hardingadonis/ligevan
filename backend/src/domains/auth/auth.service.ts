import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';

import { AdminsService } from '@/domains/admins/admins.service';
import { verify } from '@/utils/hash.util';

@Injectable()
export class AuthService {
	constructor(private adminsService: AdminsService) {}

	async validateAdmin(username: string, password: string) {
		const admin = await this.adminsService.getByUsernameWithPassword(username);

		if (!admin) {
			throw new NotFoundException(`Admin with username ${username} not found!`);
		}

		const isPasswodMatch = await verify(admin.hashedPassword, password);

		if (!isPasswodMatch) {
			throw new UnauthorizedException('Invalid password!');
		}

		return { username: admin.username };
	}
}