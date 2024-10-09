import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
	CreatePaymentDto,
	UpdatePaymentDto,
} from '@/domains/payments/dto/payment.dto';
import { Payment } from '@/schemas/payment.schema';

@Injectable()
export class PaymentsService {
	private readonly logger = new Logger(PaymentsService.name);

	constructor(
		@InjectModel(Payment.name) private readonly salaryModel: Model<Payment>,
	) {}

	async create(createPaymentDto: CreatePaymentDto) {
		try {
			const paymentIsExist = await this.salaryModel
				.findOne({
					student: createPaymentDto.student,
					course: createPaymentDto.course,
					class: createPaymentDto.class,
					voucher: createPaymentDto.voucher,
					originPrice: createPaymentDto.originPrice,
					finalPrice: createPaymentDto.finalPrice,
					method: createPaymentDto.method,
				})
				.exec();

			this.logger.debug('Payment found', paymentIsExist);

			if (paymentIsExist) {
				this.logger.error('Payment already exists!');

				throw new ConflictException('Payment already exists!');
			}

			const payment = new this.salaryModel(createPaymentDto);

			this.logger.debug('Created new payment', payment);

			return await payment.save();
		} catch (error: any) {
			this.logger.error('Failed to create payment!', error);

			throw new InternalServerErrorException('Failed to create payment!');
		}
	}

	async getAll() {
		try {
			const payments = await this.salaryModel
				.find()
				.populate({
					select: '-__v -hashedPassword',
					path: 'student',
					model: 'Student',
				})
				.populate({
					select: '-__v',
					path: 'course',
					model: 'Course',
				})
				.populate({
					select: '-__v',
					path: 'class',
					model: 'Class',
				})
				.populate({
					select: '-__v',
					path: 'voucher',
					model: 'Voucher',
				})
				.select('-__v')
				.exec();

			this.logger.debug('Found all payments', payments);

			return payments;
		} catch (error: any) {
			this.logger.error('Failed to get all payments!', error);

			throw new InternalServerErrorException('Failed to get all payments!');
		}
	}

	async getById(id: string) {
		try {
			const payment = await this.salaryModel
				.findOne({ _id: id })
				.populate({
					select: '-__v -hashedPassword',
					path: 'student',
					model: 'Student',
				})
				.populate({
					select: '-__v',
					path: 'course',
					model: 'Course',
				})
				.populate({
					select: '-__v',
					path: 'class',
					model: 'Class',
				})
				.populate({
					select: '-__v',
					path: 'voucher',
					model: 'Voucher',
				})
				.select('-__v')
				.exec();

			if (!payment) {
				this.logger.error('Payment not found!');

				throw new ConflictException('Payment not found!');
			}

			this.logger.debug('Found payment', payment);

			return payment;
		} catch (error: any) {
			this.logger.error('Failed to get payment!', error);

			throw new InternalServerErrorException('Failed to get payment!');
		}
	}

	async update(id: string, updatePaymentDto: UpdatePaymentDto) {
		try {
			const payment = await this.salaryModel
				.findOne({ _id: id })
				.select('-__v')
				.exec();

			this.logger.debug('Found payment', payment);

			if (!payment) {
				this.logger.error('Payment not found!');

				throw new ConflictException('Payment not found!');
			}

			const updatedPayment = await this.salaryModel
				.findOneAndUpdate(
					{ _id: id },
					{ $set: updatePaymentDto },
					{ new: true },
				)
				.exec();

			this.logger.debug('Updated payment', updatedPayment);

			return updatedPayment;
		} catch (error: any) {
			this.logger.error('Failed to update payment!', error);

			throw new InternalServerErrorException('Failed to update payment!');
		}
	}
}
