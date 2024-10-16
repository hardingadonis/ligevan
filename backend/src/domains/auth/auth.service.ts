import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminsService } from '@/domains/admins/admins.service';
import { Role } from '@/domains/auth/enums/role.enum';
import { CreateStudentDto } from '@/domains/students/dto/student.dto';
import { StudentsService } from '@/domains/students/students.service';
import { TeachersService } from '@/domains/teachers/teachers.service';
import { verify } from '@/utils/hash.util';

@Injectable()
export class AuthService {
	constructor(
		private readonly adminsService: AdminsService,
		private readonly studentsService: StudentsService,
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

		return { username: admin.username, role: Role.ADMIN };
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

		return { email: teacher.email, role: Role.TEACHER };
	}

	async validateStudent(studentUser: CreateStudentDto) {
		try {
			const student = await this.studentsService.getByEmail(studentUser.email);

			if (student) {
				return { email: student.email, role: Role.STUDENT };
			}
		} catch (error: any) {
			if (error instanceof NotFoundException) {
				const student = await this.studentsService.create(studentUser);

				return { email: student.email, role: Role.STUDENT };
			}

			throw error;
		}

		return null;
	}

	async validateJWTUser(user: unknown) {
		if (
			typeof user !== 'object' ||
			user === null ||
			!('role' in user) ||
			!('sub' in user)
		) {
			throw new UnauthorizedException('Invalid user!');
		}

		let userFromDb: any = null;

		try {
			switch (user.role) {
				case Role.ADMIN:
					userFromDb = await this.adminsService.getByUsername(
						user.sub as string,
					);
					break;
				case Role.TEACHER:
					userFromDb = await this.teachersService.getByEmailWithPassword(
						user.sub as string,
					);
					break;
				default:
					throw new UnauthorizedException('Invalid role!');
			}
		} catch (error) {
			throw new UnauthorizedException(
				'An error occurred while validating the user!',
				error,
			);
		}

		if (!userFromDb) {
			throw new NotFoundException(
				`User not found for ${user.role} with identifier ${user.sub}!`,
			);
		}

		return user;
	}

	async login(payload: unknown) {
		if (typeof payload != 'object' || payload == null) {
			throw new UnauthorizedException('Invalid payload!');
		}

		return await this.jwtService.signAsync(payload);
	}
}
