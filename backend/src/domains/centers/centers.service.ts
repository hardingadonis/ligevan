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
			const checkCenterExist = await this.centerModel
				.findOne({ email: createCenterDto.email })
				.exec();

			this.logger.debug('Center found', checkCenterExist);

			if (checkCenterExist) {
				this.logger.error('Center already exists!');

				throw new ConflictException('Center already exists!');
			}

			const newCenter = new this.centerModel(createCenterDto);

			this.logger.debug('Created new center', newCenter);

			return await newCenter.save();
		} catch (error: any) {
			this.logger.error('Failed to create center!', error);

			throw new InternalServerErrorException('Failed to create center!', error);
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
				.select('-__v')
				.exec();

			this.logger.debug('Found centers', centers);

			return centers;
		} catch (error: any) {
			this.logger.error('Failed to get centers!', error);

			throw new InternalServerErrorException('Failed to get centers!', error);
		}
	}

	async getCenterById(id: string) {
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
				.select('-__v')
				.exec();

			this.logger.debug('Found center', center);

			if (!center) {
				this.logger.error('Center not found!');

				throw new NotFoundException('Center not found!');
			}

			return center;
		} catch (error: any) {
			this.logger.error('Failed to get center!', error);

			throw new InternalServerErrorException('Failed to get center!', error);
		}
	}

	async update(id: string, updateCenterDto: UpdateCenterDto) {
		try {
			const checkCenterExist = await this.centerModel
				.findOne({ name: updateCenterDto.name, isDeleted: false })
				.exec();

			this.logger.debug('Center found', checkCenterExist);

			if (checkCenterExist) {
				this.logger.error('Center already exists!');

				throw new ConflictException('Center already exists!');
			}

			const center = await this.centerModel
				.findOneAndUpdate(
					{ _id: id, isDeleted: false },
					{ ...updateCenterDto },
					{ new: true },
				)
				.select('-__v')
				.exec();

			this.logger.debug('Updated center', center);

			return center;
		} catch (error: any) {
			this.logger.error('Failed to update center!', error);

			throw new InternalServerErrorException('Failed to update center!', error);
		}
	}

	async delete(id: string) {
		try {
			const center = await this.centerModel
				.findOneAndUpdate(
					{ _id: id, isDeleted: false },
					{ isDeleted: true },
					{ new: true },
				)
				.select('-__v')
				.exec();

			this.logger.debug('Deleted center', center);

			if (!center) {
				this.logger.error('Center not found!');

				throw new NotFoundException('Center not found!');
			}

			return {
				statusCode: 200,
				message: 'Center deleted successfully',
			};
		} catch (error: any) {
			this.logger.error('Failed to delete center!', error);

			throw new InternalServerErrorException('Failed to delete center!', error);
		}
	}
}
