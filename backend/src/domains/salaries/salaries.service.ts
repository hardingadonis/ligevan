import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSalaryDto } from '@/domains/salaries/dto/salary.dto';
import { Salary } from '@/schemas/salary.schema';

@Injectable()
export class SalariesService {
	private readonly logger = new Logger(SalariesService.name);

	constructor(
		@InjectModel(Salary.name) private readonly salaryModel: Model<Salary>,
	) {}

	async create(createSalaryDto: CreateSalaryDto) {
		try {
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

			return newSalary;
		} catch (error: any) {
			this.logger.error('Failed to create salary!', error);

			throw new InternalServerErrorException('Failed to create salary!');
		}
	}

	async getAll() {
		try {
			const salaries = await this.salaryModel
				.find()
				.populate({
					select: '-__v -hashedPassword',
					path: 'teacher',
					model: 'Teacher',
				})
				.select('-__v')
				.exec();

			this.logger.debug('Found all salaries', salaries);

			if (!salaries) {
				this.logger.error('Salaries not found!');

				throw new NotFoundException('Salaries not found!');
			}

			this.logger.log('Retrieved salaries');

			return salaries;
		} catch (error: any) {
			this.logger.error('Failed to get salaries!', error);

			throw new InternalServerErrorException('Failed to get salaries!');
		}
	}

	async getById(id: string) {
		try {
			const salary = await this.salaryModel
				.findOne({ _id: id })
				.populate({
					select: '-__v -hashedPassword',
					path: 'teacher',
					model: 'Teacher',
				})
				.select('-__v')
				.exec();

			this.logger.debug('Found salary', salary);

			if (!salary) {
				this.logger.error('Salary not found!');

				throw new NotFoundException('Salary not found!');
			}

			this.logger.log('Retrieved salary');

			return salary;
		} catch (error: any) {
			this.logger.error('Failed to get salary!', error);

			throw new InternalServerErrorException('Failed to get salary!');
		}
	}

	async update(id: string, updateSalaryDto: CreateSalaryDto) {
		try {
			const existingSalary = await this.salaryModel.findOne({ _id: id }).exec();

			this.logger.debug('Found salary', existingSalary);

			if (!existingSalary) {
				this.logger.error('Salary not found!');

				throw new NotFoundException('Salary not found!');
			}

			existingSalary.set(updateSalaryDto);

			this.logger.debug('Updating salary');

			const updatedSalary = await existingSalary.save();

			this.logger.debug('Salary updated', existingSalary);
			this.logger.log('Salary updated');

			return updatedSalary;
		} catch (error: any) {
			this.logger.error('Failed to update salary!', error);

			throw new InternalServerErrorException('Failed to update salary!');
		}
	}
}
