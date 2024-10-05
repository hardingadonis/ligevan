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
	CreateVoucherDto,
	UpdateVoucherDto,
} from '@/domains/vouchers/dto/voucher.dto';
import { Voucher } from '@/schemas/voucher.schema';

@Injectable()
export class VouchersService {
	private readonly logger = new Logger(VouchersService.name);

	constructor(
		@InjectModel(Voucher.name) private readonly voucherModel: Model<Voucher>,
	) {}

	async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
		try {
			const checkVoucherExist = await this.voucherModel
				.findOne({ code: createVoucherDto.code })
				.exec();

			this.logger.debug('Voucher found', checkVoucherExist);

			if (checkVoucherExist) {
				this.logger.error('Voucher code already exists!');

				throw new ConflictException('Voucher code already exists!');
			}

			const newVoucher = new this.voucherModel(createVoucherDto);

			this.logger.debug('Created new voucher', newVoucher);

			return await newVoucher.save();
		} catch (error: any) {
			this.logger.error('Failed to create voucher!', error);

			throw new InternalServerErrorException(
				'Failed to create voucher!',
				error,
			);
		}
	}

	async getAll(): Promise<Voucher[]> {
		try {
			this.logger.log('Retrieving all vouchers');

			return await this.voucherModel
				.find({ isDeleted: false })
				.select('-__v')
				.exec();
		} catch (error: any) {
			this.logger.error('Failed to retrieve vouchers', error);

			throw new InternalServerErrorException(
				'Failed to retrieve vouchers',
				error,
			);
		}
	}

	async getVoucherByCode(code: string): Promise<Voucher> {
		const voucher = await this.voucherModel
			.findOne({ code: code, isDeleted: false })
			.select('-__v')
			.exec();

		this.logger.debug('Retrieved voucher', voucher);

		if (!voucher) {
			this.logger.error('Voucher not found');

			throw new NotFoundException('Voucher not found');
		}

		this.logger.log('Voucher found');

		return voucher;
	}

	async update(
		id: string,
		updateVoucherDto: UpdateVoucherDto,
	): Promise<Voucher> {
		try {
			const checkVoucherExist = await this.voucherModel
				.findOne({ _id: id, isDeleted: false })
				.exec();

			this.logger.debug('Voucher found', checkVoucherExist);

			if (!checkVoucherExist) {
				this.logger.error('Voucher not found');

				throw new NotFoundException('Voucher not found');
			}

			this.logger.log('Updating voucher');

			return await this.voucherModel
				.findByIdAndUpdate(id, updateVoucherDto, { new: true, isDelete: false })
				.select('-__v')
				.exec();
		} catch (error: any) {
			this.logger.error('Failed to update voucher', error);

			throw new InternalServerErrorException('Failed to update voucher', error);
		}
	}

	async delete(id: string): Promise<Voucher> {
		try {
			const checkVoucherExist = await this.voucherModel
				.findOne({ _id: id })
				.exec();

			this.logger.debug('Voucher found', checkVoucherExist);

			if (!checkVoucherExist) {
				this.logger.error('Voucher not found');

				throw new NotFoundException('Voucher not found');
			}

			this.logger.log('Deleting voucher');

			return await this.voucherModel
				.findByIdAndUpdate(id, { isDeleted: true })
				.exec();
		} catch (error: any) {
			this.logger.error('Failed to delete voucher', error);

			throw new InternalServerErrorException('Failed to delete voucher', error);
		}
	}
}
