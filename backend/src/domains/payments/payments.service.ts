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
			const existingPayment = await this.salaryModel
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

			if (existingPayment) {
				this.logger.error('Payment already exists!');

				throw new ConflictException('Payment already exists!');
			}

			const newPayment = new this.salaryModel(createPaymentDto);

			this.logger.debug('Creating new payment');

			await newPayment.save();

			this.logger.debug('Payment created', newPayment);
			this.logger.log('Payment created');

			return newPayment;
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

			if (!payments) {
				this.logger.error('Payments not found!');

				throw new ConflictException('Payments not found!');
			}

			this.logger.debug('Found all payments', payments);

			this.logger.log('Retrieved payments');

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

			this.logger.log('Retrieved payment');

			return payment;
		} catch (error: any) {
			this.logger.error('Failed to get payment!', error);

			throw new InternalServerErrorException('Failed to get payment!');
		}
	}

	async update(id: string, updatePaymentDto: UpdatePaymentDto) {
		try {
			const existingPayment = await this.salaryModel
				.findOne({ _id: id })
				.exec();

			if (!existingPayment) {
				this.logger.error('Payment not found!');

				throw new ConflictException('Payment not found!');
			}

			this.logger.debug('Found payment', existingPayment);

			existingPayment.set(updatePaymentDto);

			this.logger.debug('Updating payment');

			const updatedPayment = await existingPayment.save();

			this.logger.debug('Updated payment', updatedPayment);
			this.logger.log('Payment updated');

			return updatedPayment;
		} catch (error: any) {
			this.logger.error('Failed to update payment!', error);

			throw new InternalServerErrorException('Failed to update payment!');
		}
	}
}
