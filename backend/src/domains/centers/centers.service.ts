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
		try {
			const existingCenter = await this.centerModel
				.findOne({ email: createCenterDto.email })
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
		} catch (error: any) {
			this.logger.error('Failed to create center!', error);

			throw new InternalServerErrorException('Failed to create center!');
		}
	}

	async getAll() {
		try {
			const centers = await this.centerModel
				.find({ isDeleted: false })
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
				.select('-__v')
				.exec();

			if (!centers) {
				this.logger.error('Centers not found!');

				throw new NotFoundException('Centers not found!');
			}

			this.logger.debug('Found centers', centers);

			this.logger.log('Retrieved centers');

			return centers;
		} catch (error: any) {
			this.logger.error('Failed to get centers!', error);

			throw new InternalServerErrorException('Failed to get centers!');
		}
	}

	async getById(id: string) {
		try {
			const center = await this.centerModel
				.findOne({ _id: id, isDeleted: false })
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
				.select('-__v')
				.exec();

			if (!center) {
				this.logger.error('Center not found!');

				throw new NotFoundException('Center not found!');
			}

			this.logger.debug('Found center', center);

			this.logger.log('Retrieved center');

			return center;
		} catch (error: any) {
			this.logger.error('Failed to get center!', error);

			throw new InternalServerErrorException('Failed to get center!');
		}
	}

	async update(id: string, updateCenterDto: UpdateCenterDto) {
		try {
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
		} catch (error: any) {
			this.logger.error('Failed to update center!', error);

			throw new InternalServerErrorException('Failed to update center!');
		}
	}

	async delete(id: string) {
		try {
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
		} catch (error: any) {
			this.logger.error('Failed to delete center!', error);

			throw new InternalServerErrorException('Failed to delete center!');
		}
	}
}
