import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
	ChangePasswordDto,
	CreateTeacherDto,
	UpdateTeacherDto,
} from '@/domains/teachers/dto/teacher.dto';
import { Center } from '@/schemas/center.schema';
import { Teacher } from '@/schemas/teacher.schema';
import { hash, verify } from '@/utils/hash.util';

@Injectable()
export class TeachersService {
	private readonly logger = new Logger(TeachersService.name);

	constructor(
		@InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
		@InjectModel(Center.name) private readonly centerModel: Model<Center>,
	) {}

	async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
		const existingTeacher = await this.teacherModel
			.findOne({ email: createTeacherDto.email })
			.exec();

		if (existingTeacher) {
			this.logger.error(`Teacher already exists!`);

			throw new ConflictException(`Teacher already exists!`);
		}

		const createTeacher = new this.teacherModel({
			...createTeacherDto,
			hashedPassword: await hash(createTeacherDto.password),
		});

		this.logger.debug('Creating new teacher');

		await createTeacher.save();

		this.logger.log('Teacher created successfully!');

		await this.centerModel.findByIdAndUpdate(createTeacherDto.center, {
			$push: { teachers: createTeacher._id },
		});

		const teacherObject = createTeacher.toObject();
		delete teacherObject.hashedPassword;

		return teacherObject;
	}

	private async populateTeacher(query) {
		return query
			.populate({
				select: '-__v',
				path: 'center',
				model: 'Center',
			})
			.populate({
				select: '-__v',
				path: 'classes',
				model: 'Class',
			})
			.populate({
				select: '-__v',
				path: 'salaries',
				model: 'Salary',
			})
			.select('-__v -hashedPassword');
	}

	async getAll(): Promise<Teacher[]> {
		const teachers = await this.populateTeacher(
			this.teacherModel.find({ isDeleted: false }),
		);

		if (!teachers) {
			this.logger.error('No teachers found!');

			throw new NotFoundException('No teachers found!');
		}

		this.logger.debug('Found all teachers', teachers);

		this.logger.log('Retrieved teachers');

		return teachers;
	}

	async getById(id: string) {
		const teacher = await this.getByIdWithPassword(id);

		const teacherObject = teacher.toObject();
		delete teacherObject.hashedPassword;

		return teacherObject;
	}

	async getByEmail(email: string) {
		const teacher = await this.getByEmailWithPassword(email);

		const teacherObject = teacher.toObject();
		delete teacherObject.hashedPassword;

		return teacherObject;
	}

	async getByIdWithPassword(id: string) {
		const teacher = await this.populateTeacher(
			this.teacherModel.findOne({ _id: id, isDeleted: false }),
		);

		if (!teacher) {
			this.logger.error(`Teacher with id ${id} not found!`);

			throw new ConflictException(`Teacher with id ${id} not found!`);
		}

		this.logger.debug('Found teacher', teacher);

		return teacher;
	}

	async getByEmailWithPassword(email: string) {
		const teacher = await this.teacherModel
			.findOne({ email: email, isDeleted: false })
			.select('-__v')
			.exec();

		if (!teacher) {
			this.logger.error(`Teacher with email ${email} not found!`);

			throw new ConflictException(`Teacher with email ${email} not found!`);
		}

		this.logger.debug('Found teacher', teacher);

		return teacher;
	}

	async update(
		id: string,
		updateTeacherDto: UpdateTeacherDto,
	): Promise<Teacher> {
		const existingTeacher = await this.teacherModel
			.findOne({ _id: id, isDeleted: false })
			.select('-__v')
			.exec();

		if (!existingTeacher) {
			this.logger.error(`Teacher not found!`);

			throw new ConflictException(`Teacher not found!`);
		}

		this.logger.debug('Found teacher', existingTeacher);

		const { password, ...teacherUpdates } = updateTeacherDto;
		existingTeacher.set({
			...existingTeacher,
			...teacherUpdates,
			hashedPassword: password
				? await hash(password)
				: existingTeacher.hashedPassword,
		});

		this.logger.debug('Updating teacher');

		const updatedTeacher = await existingTeacher.save();

		this.logger.debug('Teacher updated', updatedTeacher);
		this.logger.log('Teacher updated');

		const teacherObject = updatedTeacher.toObject();
		delete teacherObject.hashedPassword;

		return teacherObject;
	}

	async changePassword(email: string, changePasswordDto: ChangePasswordDto) {
		const { currentPassword, newPassword } = changePasswordDto;

		const teacher = await this.teacherModel
			.findOne({ email: email, isDeleted: false })
			.exec();

		if (!teacher) {
			this.logger.error(`Teacher not found!`);
			throw new ConflictException(`Teacher not found!`);
		}

		const isPasswordValid = await verify(
			teacher.hashedPassword,
			currentPassword,
		);

		if (!isPasswordValid) {
			this.logger.error(`Current password is incorrect!`);
			throw new ConflictException(`Current password is incorrect!`);
		}

		teacher.hashedPassword = await hash(newPassword);
		await teacher.save();

		this.logger.debug('Password updated', teacher);
		this.logger.log('Password updated');

		return { message: 'Password updated successfully!' };
	}

	async delete(id: string) {
		const existingTeacher = await this.teacherModel
			.findOneAndUpdate({ _id: id, isDeleted: false })
			.select('-__v, -hashedPassword')
			.exec();

		if (!existingTeacher) {
			this.logger.error(`Teacher not found!`);

			throw new ConflictException(`Teacher not found!`);
		}

		this.logger.debug('Deleting teacher');

		existingTeacher.set({ isDeleted: true });

		await existingTeacher.save();

		this.logger.debug('Teacher deleted', existingTeacher);
		this.logger.log('Teacher deleted');

		return {
			statusCode: 200,
			message: 'Teacher deleted successfully',
		};
	}
}
