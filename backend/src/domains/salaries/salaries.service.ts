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
			const salaryIsExist = await this.salaryModel
				.findOne({
					teacher: createSalaryDto.teacher,
					start: createSalaryDto.start,
					end: createSalaryDto.end,
					finalSalary: createSalaryDto.finalSalary,
				})
				.exec();

			this.logger.debug('Salary found', salaryIsExist);

			if (salaryIsExist) {
				this.logger.error('Salary already exists!');

				throw new ConflictException('Salary already exists!');
			}

			const newSalary = new this.salaryModel(createSalaryDto);

			this.logger.debug('Created new salary', newSalary);

			return await newSalary.save();
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

			this.logger.debug('Salaries found', salaries);

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

			if (!salary) {
				this.logger.error('Salary not found!');

				throw new NotFoundException('Salary not found!');
			}
			this.logger.debug('Found salary', salary);

			return salary;
		} catch (error: any) {
			this.logger.error('Failed to get salary!', error);

			throw new InternalServerErrorException('Failed to get salary!', error);
		}
	}

	async update(id: string, updateSalaryDto: CreateSalaryDto) {
		try {
			const salary = await this.salaryModel
				.findOne({ _id: id })
				.select('-__v')
				.exec();

			this.logger.debug('Found salary', salary);

			if (!salary) {
				this.logger.error('Salary not found!');

				throw new NotFoundException('Salary not found!');
			}

			const updatedSalary = await this.salaryModel
				.findOneAndUpdate({ _id: id }, { ...updateSalaryDto }, { new: true })
				.select('-__v')
				.exec();

			this.logger.debug('Updated salary', updatedSalary);

			return updatedSalary;
		} catch (error: any) {
			this.logger.error('Failed to update salary!', error);

			throw new InternalServerErrorException('Failed to update salary!', error);
		}
	}
}
