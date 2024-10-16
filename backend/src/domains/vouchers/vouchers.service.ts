import {
	ConflictException,
	Injectable,
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
		const existingVoucher = await this.voucherModel
			.findOne({ code: createVoucherDto.code })
			.exec();

		if (existingVoucher) {
			this.logger.error('Voucher already exists!');

			throw new ConflictException('Voucher already exists!');
		}

		const newVoucher = new this.voucherModel(createVoucherDto);

		this.logger.debug('Creating new voucher');

		await newVoucher.save();

		this.logger.debug('Voucher created', newVoucher);
		this.logger.log('Voucher created');

		return newVoucher;
	}

	async getAll(): Promise<Voucher[]> {
		const vouchers = await this.voucherModel
			.find({ isDeleted: false })
			.select('-__v')
			.exec();

		if (!vouchers) {
			this.logger.error('Vouchers not found!');

			throw new NotFoundException('Vouchers not found!');
		}

		this.logger.debug('Found vouchers', vouchers);

		this.logger.log('Retrieved vouchers');

		return vouchers;
	}

	async getById(id: string): Promise<Voucher> {
		const voucher = await this.voucherModel
			.findOne({ _id: id, isDeleted: false })
			.select('-__v')
			.exec();

		if (!voucher) {
			this.logger.error('Voucher not found');

			throw new NotFoundException('Voucher not found');
		}

		this.logger.debug('Found voucher', voucher);

		this.logger.log('Retrieved voucher');

		return voucher;
	}

	async update(
		id: string,
		updateVoucherDto: UpdateVoucherDto,
	): Promise<Voucher> {
		const existingVoucher = await this.voucherModel
			.findOne({ _id: id, isDeleted: false })
			.exec();

		if (!existingVoucher) {
			this.logger.error('Voucher not found');

			throw new NotFoundException('Voucher not found');
		}

		this.logger.debug('Voucher found', existingVoucher);

		this.logger.log('Updating voucher');

		existingVoucher.set(updateVoucherDto);

		const updatedVoucher = await existingVoucher.save();

		this.logger.debug('Voucher updated', updatedVoucher);
		this.logger.log('Voucher updated');

		return updatedVoucher;
	}

	async delete(id: string) {
		const existingVoucher = await this.voucherModel
			.findOne({ _id: id, isDeleted: false })
			.select('-__v')
			.exec();

		if (!existingVoucher) {
			this.logger.error('Voucher not found!');

			throw new NotFoundException('Voucher not found!');
		}

		this.logger.debug('Deleting Voucher');

		existingVoucher.set({ isDeleted: true });

		await existingVoucher.save();

		this.logger.log('Voucher deleted');

		return {
			statusCode: 200,
			message: 'Voucher deleted successfully',
		};
	}
}
