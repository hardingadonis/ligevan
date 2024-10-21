import {
	ConflictException,
	Injectable,
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

@Injectable()
export class StudentsService {
	private readonly logger = new Logger(StudentsService.name);

	constructor(
		@InjectModel(Student.name) private readonly studentModel: Model<Student>,
	) {}

	async create(createStudentDto: CreateStudentDto) {
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
		});

		this.logger.debug('Creating new student');

		await createStudent.save();

		this.logger.log('Student created successfully!');

		return createStudent;
	}

	private async populateStudent(query) {
		return query
			.populate({
				select: '-__v',
				path: 'classes',
				model: 'Class',
			})
			.populate({
				select: '-__v',
				path: 'payments',
				model: 'Payment',
			})
			.select('-__v -hashedPassword');
	}

	async getAll() {
		const students = await this.populateStudent(
			this.studentModel.find({ isDeleted: false }),
		);

		if (!students) {
			this.logger.error('No students found!');

			throw new NotFoundException('No students found!');
		}

		this.logger.debug('Found all students', students);

		this.logger.log('Retrieved students');

		return students;
	}

	async getById(id: string) {
		return await this.getStudent({ _id: id });
	}

	async getByEmail(email: string) {
		return await this.getStudent({ email: email });
	}

	async getStudent(conditions: object) {
		const student = await this.populateStudent(
			this.studentModel.findOne({ ...conditions, isDeleted: false }),
		);

		if (!student) {
			this.logger.error(
				`Student not found with conditions: ${JSON.stringify(conditions)}`,
			);

			throw new NotFoundException(
				'Student not found with provided conditions!',
			);
		}

		this.logger.debug('Found student', student);

		this.logger.debug('Retrieved student', student);

		return student;
	}

	async update(id: string, updateStudentDto: UpdateStudentDto) {
		const existingStudent = await this.studentModel
			.findOne({ _id: id, isDeleted: false })
			.select('-__v')
			.exec();

		if (!existingStudent) {
			this.logger.error('Student not found!');

			throw new NotFoundException('Student not found!');
		}

		this.logger.debug('Found student', existingStudent);

		existingStudent.set(updateStudentDto);

		this.logger.debug('Updating student');

		const updatedStudent = await existingStudent.save();

		this.logger.debug('Student updated', updatedStudent);
		this.logger.log('Student updated');

		return updatedStudent;
	}

	async delete(id: string) {
		const existingStudent = await this.studentModel
			.findOne({ _id: id, isDeleted: false })
			.select('-__v')
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
	}
}
