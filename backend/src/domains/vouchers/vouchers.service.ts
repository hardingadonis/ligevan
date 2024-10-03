import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
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
	constructor(
		@InjectModel(Voucher.name) private readonly voucherService: Model<Voucher>,
	) {}

	async createVoucher(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
		try {
			const checkVoucherExist = await this.voucherService
				.findOne({ code: createVoucherDto.code })
				.exec();

			if (checkVoucherExist) {
				throw new ConflictException('Voucher code already exists!');
			}

			const newVoucher = new this.voucherService(createVoucherDto);
			return await newVoucher.save();
		} catch (error: any) {
			throw new InternalServerErrorException(
				'Failed to create voucher!',
				error,
			);
		}
	}

	async getAllVouchers(): Promise<Voucher[]> {
		try {
			return await this.voucherService.find({ isDeleted: false }).exec();
		} catch (error: any) {
			throw new InternalServerErrorException(
				'Failed to retrieve vouchers',
				error,
			);
		}
	}

	async getVoucherByCode(code: string): Promise<Voucher> {
		const voucher = await this.voucherService
			.findOne({ code: code, isDeleted: false })
			.exec();

		if (!voucher) {
			throw new NotFoundException('Voucher not found');
		}

		return voucher;
	}

	async updateVoucher(
		id: string,
		updateVoucherDto: UpdateVoucherDto,
	): Promise<Voucher> {
		try {
			const checkVoucherExist = await this.voucherService
				.findOne({ _id: id })
				.exec();
			if (!checkVoucherExist) {
				throw new NotFoundException('Voucher not found');
			}

			return await this.voucherService
				.findByIdAndUpdate(id, updateVoucherDto, { new: true, isDelete: false })
				.exec();
		} catch (error: any) {
			throw new InternalServerErrorException('Failed to update voucher', error);
		}
	}

	async deleteVoucher(id: string): Promise<Voucher> {
		try {
			const checkVoucherExist = await this.voucherService
				.findOne({ _id: id })
				.exec();
			if (!checkVoucherExist) {
				throw new NotFoundException('Voucher not found');
			}

			return await this.voucherService
				.findByIdAndUpdate(id, { isDeleted: true })
				.exec();
		} catch (error: any) {
			throw new InternalServerErrorException('Failed to delete voucher', error);
		}
	}
}
