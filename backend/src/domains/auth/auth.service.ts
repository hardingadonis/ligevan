import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminsService } from '@/domains/admins/admins.service';
import { TeachersService } from '@/domains/teachers/teachers.service';
import { verify } from '@/utils/hash.util';

@Injectable()
export class AuthService {
	constructor(
		private readonly adminsService: AdminsService,
		private readonly teachersService: TeachersService,
		private readonly jwtService: JwtService,
	) {}

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

	async validateTeacher(email: string, password: string) {
		const teacher = await this.teachersService.getByEmailWithPassword(email);

		if (!teacher) {
			throw new NotFoundException(`Teacher with email ${email} not found!`);
		}

		const isPasswodMatch = await verify(teacher.hashedPassword, password);

		if (!isPasswodMatch) {
			throw new UnauthorizedException('Invalid password!');
		}

		return { email: teacher.email };
	}

	async login(payload: unknown) {
		if (typeof payload != 'object' || payload == null) {
			throw new UnauthorizedException('Invalid payload!');
		}

		return await this.jwtService.signAsync(payload);
	}
}
