import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
	CreateClassDto,
	UpdateClassDto,
} from '@/domains/classes/dto/class.dto';
import { Class } from '@/schemas/class.schema';

@Injectable()
export class ClassesService {
	private readonly logger = new Logger(ClassesService.name);

	constructor(
		@InjectModel(Class.name) private readonly classModel: Model<Class>,
	) {}

	async create(createClassDto: CreateClassDto) {
		try {
			const checkClassExist = await this.classModel
				.findOne({ name: CreateClassDto.name })
				.exec();

			this.logger.debug('Class found', checkClassExist);

			if (checkClassExist) {
				this.logger.error('Class already exists!');

				throw new ConflictException('Class already exists!');
			}

			const newClass = new this.classModel(createClassDto);

			this.logger.debug('Created new class', newClass);

			return await newClass.save();
		} catch (error: any) {
			this.logger.error('Failed to create class!', error);

			throw new InternalServerErrorException('Failed to create class!', error);
		}
	}

	async getAll() {
		try {
			const classes = await this.classModel
				.find({ isDeleted: false })
				.populate({
					select: '-__v',
					path: 'center',
					model: 'Center',
				})
				.populate({
					select: '-__v  -hashedPassword',
					path: 'teacher',
					model: 'Teacher',
				})
				.select('-__v')
				.exec();
			this.logger.debug('Found centers', classes);

			return classes;
		} catch (error: any) {
			this.logger.error('Failed to get classes!', error);

			throw new InternalServerErrorException('Failed to get classes!', error);
		}
	}

	async getById(id: string) {
		try {
			const getClass = await this.classModel
				.findOne({ _id: id, isDeleted: false })
				.populate({
					select: '-__v',
					path: 'center',
					model: 'Center',
				})
				.populate({
					select: '-__v  -hashedPassword',
					path: 'teacher',
					model: 'Teacher',
				})
				.select('-__v')
				.exec();

			if (!getClass) {
				this.logger.error('Class not found!');

				throw new ConflictException('Class not found!');
			}
			this.logger.debug('Found centers', getClass);

			return getClass;
		} catch (error: any) {
			this.logger.error('Failed to get classes!', error);

			throw new InternalServerErrorException('Failed to get classes!', error);
		}
	}

	async update(id: string, updateClassDto: UpdateClassDto) {
		try {
			const checkClassExist = await this.classModel
				.findOne({ _id: id, isDeleted: false })
				.exec();

			this.logger.debug('Class found', checkClassExist);

			if (!checkClassExist) {
				this.logger.error('Class not found!');

				throw new ConflictException('Class not found!');
			}

			const updatedClass = await this.classModel
				.findOneAndUpdate({ _id: id }, { $set: updateClassDto }, { new: true })
				.exec();

			this.logger.debug('Updated class', updatedClass);

			return updatedClass;
		} catch (error: any) {
			this.logger.error('Failed to update class!', error);

			throw new InternalServerErrorException('Failed to update class!', error);
		}
	}

	async delete(id: string) {
		try {
			const checkClassExist = await this.classModel
				.findOneAndUpdate(
					{ _id: id, isDeleted: false },
					{ $set: { isDeleted: true } },
					{ new: true },
				)
				.exec();

			this.logger.debug('Class found', checkClassExist);

			if (!checkClassExist) {
				this.logger.error('Class not found!');

				throw new ConflictException('Class not found!');
			}

			this.logger.debug('Deleted class', checkClassExist);

			return {
				statusCode: 200,
				message: 'Class deleted successfully',
			};
		} catch (error: any) {
			this.logger.error('Failed to delete class!', error);

			throw new InternalServerErrorException('Failed to delete class!', error);
		}
	}
}
