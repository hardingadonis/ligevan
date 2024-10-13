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
	CreateStudentDto,
	UpdateStudentDto,
} from '@/domains/students/dto/student.dto';
import { Student } from '@/schemas/student.schema';
import { hash } from '@/utils/hash.util';

@Injectable()
export class StudentsService {
	private readonly logger = new Logger(StudentsService.name);

	constructor(
		@InjectModel(Student.name) private readonly studentModel: Model<Student>,
	) {}

	async create(createStudentDto: CreateStudentDto) {
		try {
			const existingStudent = await this.studentModel
				.findOne({
					email: createStudentDto.email,
				})
				.exec();

			if (existingStudent) {
				this.logger.error('Student already exists!');

				throw new ConflictException('Student already exists!');
			}

			const createStudent = new this.studentModel({
				...createStudentDto,
				hashedPassword: await hash(createStudentDto.password),
			});

			this.logger.debug('Creating new student');

			await createStudent.save();

			this.logger.log('Student created successfully!');

			const studentObject = createStudent.toObject();
			delete studentObject.hashedPassword;

			return studentObject;
		} catch (error: any) {
			this.logger.error('Failed to create student!', error);

			throw new InternalServerErrorException('Failed to create student!');
		}
	}

	async getAll() {
		try {
			const students = await this.studentModel
				.find({ isDeleted: false })
				.select('-__v')
				.select('-hashedPassword')
				.populate({
					select: '-__v',
					path: 'classes',
					model: 'Class',
				})
				.exec();

			this.logger.debug('Found all students', students);

			if (!students) {
				this.logger.error('No students found!');

				throw new NotFoundException('No students found!');
			}

			this.logger.log('Retrieved students');

			return students;
		} catch (error: any) {
			this.logger.error('Failed to get all students!', error);

			throw new InternalServerErrorException('Failed to get all students!');
		}
	}

	async getById(id: string) {
		try {
			const student = await this.getByIdWithPassword(id);

			const studentObject = student.toObject();
			delete studentObject.hashedPassword;

			return studentObject;
		} catch (error: any) {
			this.logger.error('Failed to get student by id!', error);

			throw new InternalServerErrorException('Failed to get student by id!');
		}
	}

	async getByIdWithPassword(id: string) {
		try {
			const student = await this.studentModel
				.findOne({ _id: id, isDeleted: false })
				.select('-__v')
				.exec();

			this.logger.debug('Found student', student);

			if (!student) {
				this.logger.error(`Student with id ${id} not found!`);

				throw new NotFoundException(`Student with id ${id} not found!`);
			}

			this.logger.debug('Retrieved student', student);

			return student;
		} catch (error: any) {
			this.logger.error('Failed to get student by id!', error);

			throw new InternalServerErrorException('Failed to get student by id!');
		}
	}

	async update(id: string, updateStudentDto: UpdateStudentDto) {
		try {
			const existingStudent = await this.studentModel
				.findOne({ _id: id, isDeleted: false })
				.select('-__v -hashedPassword')
				.exec();

			if (!existingStudent) {
				this.logger.error('Student not found!');

				throw new NotFoundException('Student not found!');
			}

			existingStudent.set(updateStudentDto);

			this.logger.debug('Updating student');

			const updatedStudent = await existingStudent.save();

			this.logger.debug('Student updated', updatedStudent);
			this.logger.log('Student updated');

			const studentObject = updatedStudent.toObject();
			delete studentObject.hashedPassword;

			return studentObject;
		} catch (error: any) {
			this.logger.error('Failed to update student!', error);

			throw new InternalServerErrorException('Failed to update student!');
		}
	}

	async delete(id: string) {
		try {
			const existingStudent = await this.studentModel
				.findOne({ _id: id, isDeleted: false })
				.select('-__v, -hashedPassword')
				.exec();

			if (!existingStudent) {
				this.logger.error('Student not found!');

				throw new ConflictException('Student not found!');
			}

			this.logger.debug('Deleting student');

			existingStudent.set({ isDeleted: true });

			await existingStudent.save();

			this.logger.debug('Student deleted', existingStudent);
			this.logger.log('Student deleted');

			return {
				statusCode: 200,
				message: 'Student deleted successfully',
			};
		} catch (error: any) {
			this.logger.error('Failed to delete student!', error);

			throw new InternalServerErrorException('Failed to delete student!');
		}
	}
}
