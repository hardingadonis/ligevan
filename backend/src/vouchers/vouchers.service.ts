import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voucher } from 'src/schemas/voucher.schema';
import { CreateVoucherDto, UpdateVoucherDto } from './dto/voucher.dto';

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

			return new this.voucherService(createVoucherDto).save();
		} catch (error: any) {
			throw new InternalServerErrorException(
				'Failed to create voucher!',
				error,
			);
		}
	}

	async getAllVouchers(): Promise<Voucher[]> {
		try {
			return this.voucherService.find({ isDelete: false }).exec();
		} catch (error: any) {
			throw new InternalServerErrorException(
				'Failed to retrieve vouchers',
				error,
			);
		}
	}

	async getVoucherByCode(code: string): Promise<Voucher> {
		try {
			return this.voucherService.findOne({ code, isDelete: false }).exec();
		} catch (error: any) {
			throw new NotFoundException('Voucher not found', error);
		}
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

			return this.voucherService
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

			return this.voucherService
				.findByIdAndUpdate(id, { isDelete: true })
				.exec();
		} catch (error: any) {
			throw new InternalServerErrorException('Failed to delete voucher', error);
		}
	}
}
