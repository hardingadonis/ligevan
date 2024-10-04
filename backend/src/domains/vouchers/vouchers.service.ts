import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voucher } from '@/schemas/voucher.schema';
import {
	CreateVoucherDto,
	UpdateVoucherDto,
} from '@/domains/vouchers/dto/voucher.dto';

@Injectable()
export class VouchersService {
	private readonly logger = new Logger(VouchersService.name);

	constructor(
		@InjectModel(Voucher.name) private readonly voucherModel: Model<Voucher>,
	) {}

	async createVoucher(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
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

	async getAllVouchers(): Promise<Voucher[]> {
		try {
			this.logger.log('Retrieving all vouchers');

			return await this.voucherModel.find({ isDeleted: false }).exec();
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
			.exec();

		this.logger.debug('Retrieved voucher', voucher);

		if (!voucher) {
			this.logger.error('Voucher not found');

			throw new NotFoundException('Voucher not found');
		}

		this.logger.log('Voucher found');

		return voucher;
	}

	async updateVoucher(
		id: string,
		updateVoucherDto: UpdateVoucherDto,
	): Promise<Voucher> {
		try {
			const checkVoucherExist = await this.voucherModel
				.findOne({ _id: id })
				.exec();

			this.logger.debug('Voucher found', checkVoucherExist);

			if (!checkVoucherExist) {
				this.logger.error('Voucher not found');

				throw new NotFoundException('Voucher not found');
			}

			this.logger.log('Updating voucher');

			return await this.voucherModel
				.findByIdAndUpdate(id, updateVoucherDto, { new: true, isDelete: false })
				.exec();
		} catch (error: any) {
			this.logger.error('Failed to update voucher', error);

			throw new InternalServerErrorException('Failed to update voucher', error);
		}
	}

	async deleteVoucher(id: string): Promise<Voucher> {
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
