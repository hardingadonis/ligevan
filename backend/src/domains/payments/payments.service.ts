import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
	CreatePaymentDto,
	UpdatePaymentDto,
} from '@/domains/payments/dto/payment.dto';
import { MomoService } from '@/domains/payments/momo/momo.service';
import { ZalopayService } from '@/domains/payments/zalopay/zalopay.service';
import { Class } from '@/schemas/class.schema';
import { Payment } from '@/schemas/payment.schema';
import { Student } from '@/schemas/student.schema';

@Injectable()
export class PaymentsService {
	private readonly logger = new Logger(PaymentsService.name);

	constructor(
		@InjectModel(Payment.name) private readonly salaryModel: Model<Payment>,
		@InjectModel(Student.name) private readonly studentModel: Model<Student>,
		@InjectModel(Class.name) private readonly classModel: Model<Class>,
		private readonly zalopayService: ZalopayService,
		private readonly momoService: MomoService,
	) {}

	async create(createPaymentDto: CreatePaymentDto) {
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

		this.logger.debug('Payment created', newPayment);
		this.logger.log('Payment created');

		const student = await this.studentModel
			.findById(createPaymentDto.student)
			.exec();

		if (
			student.payments.includes(newPayment._id) &&
			student.classes.includes(newPayment.class)
		) {
			this.logger.error('Payment ID already exists in student payments array!');
			throw new ConflictException(
				'Payment ID already exists in student payments array!',
			);
		}

		this.logger.debug('Added payment to student');

		const classDoc = await this.classModel
			.findById(createPaymentDto.class)
			.exec();

		if (classDoc.students.includes(newPayment.student)) {
			this.logger.error('Student already exists in class!');
			throw new ConflictException('Student already exists in class!');
		}

		await this.studentModel.findByIdAndUpdate(createPaymentDto.student, {
			$push: {
				classes: newPayment.class.toString(),
				payments: newPayment._id.toString(),
			},
		});

		await this.classModel.findByIdAndUpdate(createPaymentDto.class, {
			$push: { students: newPayment.student },
		});

		await newPayment.save();

		this.logger.debug('Added student to class');

		switch (createPaymentDto.method) {
			case 'zalo-pay': {
				const result = await this.zalopayService.create({
					id: newPayment._id.toString(),
					amount: newPayment.finalPrice,
				});

				return { order_url: result.order_url };
			}

			case 'momo': {
				const result = await this.momoService.create({
					id: newPayment._id.toString(),
					amount: newPayment.finalPrice,
				});

				return { order_url: result.shortLink };
			}
		}
	}

	private async populatePayment(query) {
		return query
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
			.select('-__v');
	}

	async getAll() {
		const payments = await this.populatePayment(this.salaryModel.find());

		if (!payments) {
			this.logger.error('Payments not found!');

			throw new ConflictException('Payments not found!');
		}

		this.logger.debug('Found all payments', payments);

		this.logger.log('Retrieved payments');

		return payments;
	}

	async getById(id: string) {
		const payment = await this.populatePayment(
			this.salaryModel.findOne({ _id: id }),
		);

		if (!payment) {
			this.logger.error('Payment not found!');

			throw new ConflictException('Payment not found!');
		}

		this.logger.debug('Found payment', payment);

		this.logger.log('Retrieved payment');

		return payment;
	}

	async update(id: string, updatePaymentDto: UpdatePaymentDto) {
		const existingPayment = await this.salaryModel.findOne({ _id: id }).exec();

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
	}
}
