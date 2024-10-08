import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
	CreateTeacherDto,
	UpdateTeacherDto,
} from '@/domains/teachers/dto/teacher.dto';
import { Teacher } from '@/schemas/teacher.schema';
import { hash } from '@/utils/hash.util';

@Injectable()
export class TeachersService {
	private readonly logger = new Logger(TeachersService.name);

	constructor(
		@InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
	) {}

	async create(createTeacherDto: CreateTeacherDto) {
		try {
			const existingTeacher = await this.teacherModel
				.findOne({ email: createTeacherDto.email })
				.exec();

			if (existingTeacher) {
				this.logger.error(
					`Teacher with email: ${createTeacherDto.email} already exists!`,
				);

				throw new ConflictException(
					`Teacher with email: ${createTeacherDto.email} already exists!`,
				);
			}

			const createTeacher = new this.teacherModel({
				...createTeacherDto,
				hashedPassword: await hash(createTeacherDto.password),
			});

			this.logger.debug('Creating new teacher', createTeacher);

			await createTeacher.save();
			this.logger.log('Teacher created successfully!');

			const teacherObject = createTeacher.toObject();
			delete teacherObject.hashedPassword;

			return teacherObject;
		} catch (error: any) {
			this.logger.error('Failed to create teacher!', error);

			throw new InternalServerErrorException(
				'Failed to create teacher!',
				error,
			);
		}
	}

	async getAll() {
		try {
			const teachers = await this.teacherModel
				.find({ isDeleted: false })
				.select('-__v')
				.select('-hashedPassword')
				.exec();

			this.logger.debug('Found teachers', teachers);

			return teachers;
		} catch (error: any) {
			this.logger.error('Failed to get all teachers!', error);

			throw new InternalServerErrorException(
				'Failed to get all teachers!',
				error,
			);
		}
	}

	async getById(id: string) {
		try {
			const teacher = await this.getByIdWithPassword(id);

			const teacherObject = teacher.toObject();
			delete teacherObject.hashedPassword;

			return teacherObject;
		} catch (error: any) {
			this.logger.error('Failed to get teacher by id!', error);

			throw new InternalServerErrorException(
				'Failed to get teacher by id!',
				error,
			);
		}
	}

	async getByIdWithPassword(id: string) {
		try {
			const teacher = await this.teacherModel
				.findOne({ _id: id, isDeleted: false })
				.select('-__v')
				.exec();

			this.logger.debug('Retrieved teacher', teacher);

			if (!teacher) {
				this.logger.error(`Teacher with id ${id} not found!`);

				throw new ConflictException(`Teacher with id ${id} not found!`);
			}

			this.logger.debug('Found teacher', teacher);

			return teacher;
		} catch (error: any) {
			this.logger.error('Failed to get teacher by id!', error);

			throw new InternalServerErrorException(
				'Failed to get teacher by id!',
				error,
			);
		}
	}

	async update(id: string, updateTeacherDto: UpdateTeacherDto) {
		try {
			const teacher = await this.teacherModel
				.findOne({ _id: id, isDeleted: false })
				.exec();

			this.logger.debug('Retrieved teacher', teacher);

			if (!teacher) {
				this.logger.error(`Teacher with id ${id} not found!`);

				throw new ConflictException(`Teacher with id ${id} not found!`);
			}

			this.logger.debug('Found teacher', teacher);

			return await this.teacherModel
				.findByIdAndUpdate(id, updateTeacherDto, {
					new: true,
					isDelete: false,
				})
				.select('-__v')
				.exec();
		} catch (error: any) {
			this.logger.error('Failed to update teacher!', error);

			throw new InternalServerErrorException(
				'Failed to update teacher!',
				error,
			);
		}
	}

	async delete(id: string) {
		try {
			const teacher = await this.teacherModel
				.findOneAndUpdate(
					{ _id: id, isDeleted: false },
					{ isDeleted: true },
					{ new: true },
				)
				.exec();

			this.logger.debug('Retrieved teacher', teacher);

			if (!teacher) {
				this.logger.error(`Teacher with id ${id} not found!`);

				throw new ConflictException(`Teacher with id ${id} not found!`);
			}

			this.logger.debug('Found teacher', teacher);

			return {
				statusCode: 200,
				message: 'Teacher deleted successfully',
			};
		} catch (error: any) {
			this.logger.error('Failed to delete teacher!', error);

			throw new InternalServerErrorException(
				'Failed to delete teacher!',
				error,
			);
		}
	}
}
