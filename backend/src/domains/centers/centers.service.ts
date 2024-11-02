import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
	CreateCenterDto,
	UpdateCenterDto,
} from '@/domains/centers/dto/center.dto';
import { Center } from '@/schemas/center.schema';

@Injectable()
export class CentersService {
	private readonly logger = new Logger(CentersService.name);

	constructor(
		@InjectModel(Center.name) private readonly centerModel: Model<Center>,
	) {}

	async create(createCenterDto: CreateCenterDto) {
		const existingCenter = await this.centerModel
			.findOne({
				$or: [
					{ email: createCenterDto.email },
					{ phone: createCenterDto.phone },
					{ address: createCenterDto.address },
				],
			})
			.exec();

		if (existingCenter) {
			this.logger.error('Center already exists!');

			throw new ConflictException('Center already exists!');
		}

		const center = new this.centerModel(createCenterDto);

		this.logger.debug('Created new center', center);

		await center.save();

		this.logger.log('Center created');

		return center;
	}

	private async populateCenter(query) {
		return query
			.populate({
				select: '-__v',
				path: 'courses',
				model: 'Course',
			})
			.populate({
				select: '-__v',
				path: 'vouchers',
				model: 'Voucher',
			})
			.populate({
				select: '-__v -hashedPassword',
				path: 'teachers',
				model: 'Teacher',
			})
			.populate({
				select: '-__v',
				path: 'classes',
				model: 'Class',
			})
			.select('-__v');
	}

	async getAll() {
		const centers = await this.populateCenter(
			this.centerModel.find({ isDeleted: false }),
		);

		if (!centers) {
			this.logger.error('Centers not found!');

			throw new NotFoundException('Centers not found!');
		}

		this.logger.debug('Found centers', centers);

		this.logger.log('Retrieved centers');

		return centers;
	}

	async getById(id: string) {
		const center = await this.populateCenter(
			this.centerModel.findOne({ _id: id, isDeleted: false }),
		);

		if (!center) {
			this.logger.error('Center not found!');

			throw new NotFoundException('Center not found!');
		}

		this.logger.debug('Found center', center);

		this.logger.log('Retrieved center');

		return center;
	}

	async update(id: string, updateCenterDto: UpdateCenterDto) {
		const existingCenter = await this.centerModel
			.findOne({ _id: id, isDeleted: false })
			.exec();

		if (!existingCenter) {
			this.logger.error('Center not found!');

			throw new NotFoundException('Center not found!');
		}

		this.logger.debug('Found center', existingCenter);

		this.logger.debug('Updating center');

		existingCenter.set(updateCenterDto);

		const center = await existingCenter.save();

		this.logger.debug('Center updated ', center);
		this.logger.log('Center updated');

		return center;
	}

	async delete(id: string) {
		const existingCenter = await this.centerModel
			.findOne({ _id: id, isDeleted: false })
			.exec();

		if (!existingCenter) {
			this.logger.error('Center not found!');

			throw new NotFoundException('Center not found!');
		}

		this.logger.debug('Found center', existingCenter);

		this.logger.debug('Deleting center');

		existingCenter.set({ isDeleted: true });

		await existingCenter.save();

		this.logger.debug('Center deleted ', existingCenter);
		this.logger.log('Center deleted');

		return {
			statusCode: 200,
			message: 'Center deleted successfully',
		};
	}
}
