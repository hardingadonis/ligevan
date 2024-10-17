import {
	ConflictException,
	Injectable,
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
}
