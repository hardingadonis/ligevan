import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
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
		const existingClass = await this.classModel
			.findOne({ name: CreateClassDto.name })
			.exec();

		if (existingClass) {
			this.logger.error('Class already exists!');

			throw new ConflictException('Class already exists!');
		}

		const newClass = new this.classModel(createClassDto);

		this.logger.debug('Creating new class');

		await newClass.save();

		this.logger.debug('Class created', newClass);
		this.logger.log('Class created');

		return newClass;
	}

	private async populateClass(query) {
		return query
			.populate({
				select: '-__v',
				path: 'center',
				model: 'Center',
			})
			.populate({
				select: '-__v',
				path: 'course',
				model: 'Course',
			})
			.populate({
				select: '-__v -hashedPassword',
				path: 'teacher',
				model: 'Teacher',
			})
			.populate({
				select: '-__v -hashedPassword',
				path: 'students',
				model: 'Student',
			})
			.populate({
				select: '-__v',
				path: 'slots',
				model: 'Slot',
			})
			.select('-__v');
	}

	async getAll() {
		const classes = await this.populateClass(
			this.classModel.find({ isDeleted: false }),
		);

		if (!classes) {
			this.logger.error('Classes not found!');

			throw new NotFoundException('Classes not found!');
		}

		this.logger.debug('Found centers', classes);

		this.logger.log('Retrieved classes');

		return classes;
	}

	async getById(id: string) {
		const getClass = await this.populateClass(
			this.classModel.findOne({ _id: id, isDeleted: false }),
		);

		if (!getClass) {
			this.logger.error('Class not found!');

			throw new ConflictException('Class not found!');
		}

		this.logger.debug('Found centers', getClass);

		this.logger.log('Retrieved class');

		return getClass;
	}

	async update(id: string, updateClassDto: UpdateClassDto) {
		const existingClass = await this.classModel
			.findOne({ _id: id, isDeleted: false })
			.exec();

		if (!existingClass) {
			this.logger.error('Class not found!');

			throw new ConflictException('Class not found!');
		}

		this.logger.debug('Class found', existingClass);

		this.logger.debug('Updating class');

		existingClass.set(updateClassDto);

		const updatedClass = await existingClass.save();

		this.logger.debug('Updated class', updatedClass);
		this.logger.log('Class updated');

		return updatedClass;
	}

	async delete(id: string) {
		const existingClass = await this.classModel
			.findOne({ _id: id, isDeleted: false })
			.exec();

		if (!existingClass) {
			this.logger.error('Class not found!');

			throw new ConflictException('Class not found!');
		}

		this.logger.debug('Class found', existingClass);

		this.logger.debug('Deleting class');

		existingClass.set({ isDeleted: true });

		const deletedClass = await existingClass.save();

		this.logger.debug('Deleted class', deletedClass);

		return {
			statusCode: 200,
			message: 'Class deleted successfully',
		};
	}

	async findClassByCenterAndCourse(centerId: string, courseId: string) {
		return this.classModel
			.find({
				center: centerId,
				course: courseId,
				isDeleted: false,
			})
			.populate('center')
			.populate('course')
			.exec();
	}
}
