import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAdminDto, UpdateAdminDto } from '@/domains/admins/dto/admin.dto';
import { Admin } from '@/schemas/admin.schema';
import { hash } from '@/utils/hash.util';

@Injectable()
export class AdminsService {
	private readonly logger = new Logger(AdminsService.name);

	constructor(
		@InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
	) {}

	async create(createAdminDto: CreateAdminDto) {
		const existingAdmin = await this.adminModel
			.findOne({ username: createAdminDto.username })
			.exec();

		if (existingAdmin) {
			this.logger.error(
				`Admin with username ${createAdminDto.username} already exists!`,
			);

			throw new ConflictException(
				`Admin with username ${createAdminDto.username} already exists!`,
			);
		}

		const createdAdmin = new this.adminModel({
			...createAdminDto,
			hashedPassword: await hash(createAdminDto.password),
		});

		this.logger.debug('Creating admin', createdAdmin);

		await createdAdmin.save();

		this.logger.log('Admin created');

		const adminObject = createdAdmin.toObject();
		delete adminObject.hashedPassword;

		return adminObject;
	}

	async getByUsername(username: string) {
		const admin = await this.getByUsernameWithPassword(username);

		const adminObject = admin.toObject();
		delete adminObject.hashedPassword;

		return adminObject;
	}

	async getByUsernameWithPassword(username: string) {
		const admin = await this.adminModel
			.findOne({ username: username })
			.select('-__v')
			.exec();

		if (!admin) {
			this.logger.error(`Admin with username ${username} not found!`);

			throw new NotFoundException(`Admin with username ${username} not found!`);
		}

		this.logger.debug(`Admin with username ${username} found: ${admin}`);

		this.logger.log('Retrieved admin');

		return admin;
	}

	async update(username: string, updateAdminDto: UpdateAdminDto) {
		const existingAdmin = await this.adminModel
			.findOne({ username: username })
			.exec();

		if (!existingAdmin) {
			this.logger.error(`Admin with username ${username} not found!`);

			throw new NotFoundException(`Admin with username ${username} not found!`);
		}

		this.logger.debug('Admin found', existingAdmin);

		this.logger.debug('Updating admin');

		existingAdmin.set({
			...existingAdmin,
			fullName: updateAdminDto.fullName || existingAdmin.fullName,
			hashedPassword: updateAdminDto.password
				? await hash(updateAdminDto.password)
				: existingAdmin.hashedPassword,
		});

		const updatedAdmin = await existingAdmin.save();

		this.logger.debug('Admin updated', updatedAdmin);
		this.logger.log('Admin updated');

		const adminObject = updatedAdmin.toObject();
		delete adminObject.hashedPassword;

		return adminObject;
	}
}
