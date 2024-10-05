import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
	CreateCourseDto,
	UpdateCourseDto,
} from '@/domains/courses/dto/course.dto';
import { Course } from '@/schemas/course.schema';

@Injectable()
export class CoursesService {
	private readonly logger = new Logger(CoursesService.name);

	constructor(
		@InjectModel(Course.name) private readonly courseModel: Model<Course>,
	) {}

	async create(createCourseDto: CreateCourseDto): Promise<Course> {
		try {
			const checkCourseExist = await this.courseModel
				.findOne({ code: createCourseDto.code })
				.exec();

			this.logger.debug('Course found', checkCourseExist);

			if (checkCourseExist) {
				this.logger.error('Course code already exists!');

				throw new ConflictException('Course code already exists!');
			}

			const newCourse = new this.courseModel(createCourseDto);

			this.logger.debug('Created new course', newCourse);

			return await newCourse.save();
		} catch (error: any) {
			this.logger.error('Failed to create course!', error);

			throw new InternalServerErrorException('Failed to create course!', error);
		}
	}

	async getAll(): Promise<Course[]> {
		try {
			const courses = await this.courseModel
				.find({ isDeleted: false })
				.select('-__v')
				.exec();

			this.logger.debug('Found courses', courses);

			return courses;
		} catch (error: any) {
			this.logger.error('Failed to get all courses!', error);

			throw new InternalServerErrorException(
				'Failed to get all courses!',
				error,
			);
		}
	}

	async getCourseByCode(code: string): Promise<Course> {
		try {
			const course = await this.courseModel
				.findOne({ code, isDeleted: false })
				.select('-__v')
				.exec();

			this.logger.debug('Retrieved course', course);

			if (!course) {
				this.logger.error(`Course with code ${code} not found!`);

				throw new NotFoundException(`Course with code ${code} not found!`);
			}

			this.logger.debug('Found course', course);

			return course;
		} catch (error: any) {
			this.logger.error('Failed to get course by code!', error);

			throw new InternalServerErrorException(
				'Failed to get course by code!',
				error,
			);
		}
	}

	async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
		try {
			const course = await this.courseModel
				.findOne({ _id: id, isDeleted: false })
				.exec();

			this.logger.debug('Retrieved course', course);

			if (!course) {
				this.logger.error(`Course with code ${id} not found!`);

				throw new NotFoundException(`Course with code ${id} not found!`);
			}

			this.logger.debug('Found course', course);

			return await this.courseModel
				.findByIdAndUpdate(id, updateCourseDto, { new: true, isDelete: false })
				.select('-__v')
				.exec();
		} catch (error: any) {
			this.logger.error('Failed to update course!', error);

			throw new InternalServerErrorException('Failed to update course!', error);
		}
	}

	async delete(id: string) {
		try {
			const course = await this.courseModel
				.findOneAndUpdate(
					{ _id: id, isDeleted: false },
					{ isDeleted: true },
					{ new: true },
				)
				.select('-__v')
				.exec();

			this.logger.debug('Deleted center', course);

			if (!course) {
				this.logger.error('Center not found!');

				throw new NotFoundException('Center not found!');
			}

			return {
				statusCode: 200,
				message: 'Center deleted successfully',
			};
		} catch (error: any) {
			this.logger.error('Failed to delete course!', error);

			throw new InternalServerErrorException('Failed to delete course!', error);
		}
	}
}
