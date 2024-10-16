import {
	ConflictException,
	Injectable,
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
		const existingCourse = await this.courseModel
			.findOne({ code: createCourseDto.code })
			.exec();

		if (existingCourse) {
			this.logger.error('Course code already exists!');

			throw new ConflictException('Course code already exists!');
		}

		const newCourse = new this.courseModel(createCourseDto);

		this.logger.debug('Creating new course');

		await newCourse.save();

		this.logger.debug('Course created', newCourse);
		this.logger.log('Course created');

		return newCourse;
	}

	async getAll(): Promise<Course[]> {
		const courses = await this.courseModel
			.find({ isDeleted: false })
			.select('-__v')
			.exec();

		if (!courses) {
			this.logger.error('Courses not found!');

			throw new NotFoundException('Courses not found!');
		}

		this.logger.debug('Found courses', courses);

		this.logger.log('Retrieved courses');

		return courses;
	}

	async getById(id: string): Promise<Course> {
		const course = await this.courseModel
			.findOne({ _id: id, isDeleted: false })
			.select('-__v')
			.exec();

		if (!course) {
			this.logger.error(`Course not found!`);

			throw new NotFoundException(`Course not found!`);
		}

		this.logger.debug('Found course', course);

		this.logger.log('Retrieved course');

		return course;
	}

	async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
		const existingCourse = await this.courseModel
			.findOne({ _id: id, isDeleted: false })
			.exec();

		if (!existingCourse) {
			this.logger.error(`Course with id ${id} not found!`);

			throw new NotFoundException(`Course with id ${id} not found!`);
		}

		this.logger.debug('Found course', existingCourse);

		this.logger.debug('Updating course');

		existingCourse.set(updateCourseDto);

		const updatedCourse = await existingCourse.save();

		this.logger.debug('Updated course', updatedCourse);
		this.logger.log('Course updated');

		return updatedCourse;
	}

	async delete(id: string) {
		const existingCourse = await this.courseModel
			.findOne({ _id: id, isDeleted: false })
			.exec();

		if (!existingCourse) {
			this.logger.error('Course not found!');

			throw new NotFoundException('Course not found!');
		}

		this.logger.debug('Course found', existingCourse);

		this.logger.debug('Deleting course');

		existingCourse.set({ isDeleted: true });

		const deletedCourse = await existingCourse.save();

		this.logger.debug('Deleted course', deletedCourse);
		this.logger.log('Course deleted');

		return {
			statusCode: 200,
			message: 'Course deleted successfully',
		};
	}
}
