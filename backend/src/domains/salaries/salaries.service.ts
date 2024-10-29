import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
	CalculateSalaryDto,
	CreateSalaryDto,
} from '@/domains/salaries/dto/salary.dto';
import { SlotsService } from '@/domains/slots/slots.service';
import { Class } from '@/schemas/class.schema';
import { Course } from '@/schemas/course.schema';
import { Salary } from '@/schemas/salary.schema';
import { Teacher } from '@/schemas/teacher.schema';

@Injectable()
export class SalariesService {
	private readonly logger = new Logger(SalariesService.name);

	constructor(
		@InjectModel(Salary.name) private readonly salaryModel: Model<Salary>,
		@InjectModel(Class.name) private readonly classModel: Model<Class>,
		@InjectModel(Course.name) private readonly courseModel: Model<Course>,
		@InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
		private readonly slotsService: SlotsService,
	) {}

	async create(createSalaryDto: CreateSalaryDto) {
		const existingSalary = await this.salaryModel
			.findOne({
				teacher: createSalaryDto.teacher,
				start: createSalaryDto.start,
				end: createSalaryDto.end,
				finalSalary: createSalaryDto.finalSalary,
			})
			.exec();

		if (existingSalary) {
			this.logger.error('Salary already exists!');

			throw new ConflictException('Salary already exists!');
		}

		const newSalary = new this.salaryModel(createSalaryDto);

		this.logger.debug('Creating new salary');

		await newSalary.save();

		this.logger.debug('Salary created', newSalary);
		this.logger.log('Salary created');

		await this.teacherModel.findByIdAndUpdate(createSalaryDto.teacher, {
			$push: { salaries: newSalary._id.toString() },
		});

		this.logger.debug('Updated teacher with salary', newSalary);

		return newSalary;
	}

	private async populateSalary(query) {
		return query
			.populate({
				select: '-__v -hashedPassword',
				path: 'teacher',
				model: 'Teacher',
			})
			.select('-__v');
	}

	async getAll() {
		const salaries = await this.populateSalary(this.salaryModel.find());

		if (!salaries) {
			this.logger.error('Salaries not found!');

			throw new NotFoundException('Salaries not found!');
		}

		this.logger.debug('Found all salaries', salaries);

		this.logger.log('Retrieved salaries');

		return salaries;
	}

	async getById(id: string) {
		const salary = await this.populateSalary(
			this.salaryModel.findOne({ _id: id }),
		);

		if (!salary) {
			this.logger.error('Salary not found!');

			throw new NotFoundException('Salary not found!');
		}

		this.logger.debug('Found salary', salary);

		this.logger.log('Retrieved salary');

		return salary;
	}

	async update(id: string, updateSalaryDto: CreateSalaryDto) {
		const existingSalary = await this.salaryModel.findOne({ _id: id }).exec();

		if (!existingSalary) {
			this.logger.error('Salary not found!');

			throw new NotFoundException('Salary not found!');
		}

		this.logger.debug('Found salary', existingSalary);

		existingSalary.set(updateSalaryDto);

		this.logger.debug('Updating salary');

		const updatedSalary = await existingSalary.save();

		this.logger.debug('Salary updated', existingSalary);
		this.logger.log('Salary updated');

		return updatedSalary;
	}

	async delete(id: string) {
		const salary = await this.salaryModel.findById(id).exec();

		if (!salary) {
			this.logger.error('Salary not found!');
			throw new NotFoundException('Salary not found!');
		}

		await this.salaryModel.deleteOne({ _id: id }).exec();
		this.logger.debug('Deleted salary', salary);

		await this.teacherModel.findByIdAndUpdate(salary.teacher, {
			$pull: { salaries: id },
		});

		this.logger.debug('Updated teacher by removing salary', salary);
		this.logger.log('Salary deleted and teacher updated');

		return {
			statusCode: 200,
			message: 'Salary deleted successfully',
		};
	}

	async calculate(calculateSalaryDto: CalculateSalaryDto) {
		const { percent, teachers, start, end } = calculateSalaryDto;
		const results = [];

		const createZeroSalary = async (teacher) => {
			const createSalaryDto: CreateSalaryDto = {
				teacher,
				start,
				end,
				finalSalary: 0,
			};
			const newSalary = await this.create(createSalaryDto);
			results.push(newSalary);
		};

		for (const teacher of teachers) {
			const existingSalary = await this.salaryModel
				.findOne({ teacher, start, end })
				.exec();

			if (existingSalary) {
				this.logger.error(`Salary already existing for teacher ${teacher}!`);
				throw new ConflictException(
					`Salary already existing for teacher ${teacher}!`,
				);
			}

			const classData = await this.classModel.findOne({ teacher }).exec();
			if (!classData) {
				this.logger.debug(
					`No class found for teacher ${teacher}, setting salary to 0.`,
				);
				await createZeroSalary(teacher);
				continue;
			}
			this.logger.debug('Found class', classData);

			const totalStudents = classData.students.length;
			if (totalStudents === 0) {
				this.logger.debug(
					`No students found for teacher ${teacher}, setting salary to 0.`,
				);
				await createZeroSalary(teacher);
				continue;
			}
			this.logger.debug('Total students', totalStudents);

			const course = await this.courseModel.findById(classData.course).exec();
			this.logger.debug('Found course', classData.course);

			const coursePrice = course.price;
			this.logger.debug('Course price', coursePrice);

			const listSlot = await this.slotsService.findSlotsInRange(
				classData._id.toString(),
				start,
				end,
			);

			const totalSlotDone = listSlot.length;
			if (totalSlotDone === 0) {
				this.logger.debug(
					`No slots done for teacher ${teacher}, setting salary to 0.`,
				);
				await createZeroSalary(teacher);
				continue;
			}
			this.logger.debug('Total slot done', totalSlotDone);

			const finalSalary =
				(percent / 100) * coursePrice * totalStudents * totalSlotDone;

			const createSalaryDto: CreateSalaryDto = {
				teacher,
				start,
				end,
				finalSalary,
			};

			const newSalary = await this.create(createSalaryDto);
			results.push(newSalary);
		}

		return results;
	}
}
