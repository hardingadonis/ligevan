import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAttendanceDto } from '@/domains/attendances/dto/attendance.dto';
import { Attendance } from '@/schemas/attendance.schema';

@Injectable()
export class AttendancesService {
	private readonly logger = new Logger(AttendancesService.name);

	constructor(
		@InjectModel(Attendance.name)
		private readonly attendanceModel: Model<Attendance>,
	) {}

	async create(createAttendanceDto: CreateAttendanceDto) {
		const existingAttendance = await this.attendanceModel.findOne({
			student: createAttendanceDto.student,
			slot: createAttendanceDto.slot,
		});

		if (existingAttendance) {
			this.logger.error('Attendance already exists!');

			throw new ConflictException('Attendance already exists!');
		}

		const attendance = new this.attendanceModel(createAttendanceDto);

		this.logger.debug('Creating new attendance', attendance);

		await attendance.save();

		this.logger.log('Attendance created');

		return attendance;
	}

	async getAll() {
		const attendances = await this.attendanceModel
			.find()
			.populate({
				select: 'fullName',
				path: 'student',
				model: 'Student',
			})
			.populate({
				select: '-__v',
				path: 'slot',
				model: 'Slot',
			})
			.select('-__v');

		if (!attendances) {
			this.logger.error('Attendances not found!');

			throw new NotFoundException('Attendances not found!');
		}

		this.logger.debug('Found attendances', attendances);

		this.logger.log('Retrieved attendances');

		return attendances;
	}

	async getById(id: string) {
		const attendance = await this.attendanceModel
			.findById(id)
			.populate({
				select: 'fullName',
				path: 'student',
				model: 'Student',
			})
			.populate({
				select: '-__v',
				path: 'slot',
				model: 'Slot',
			})
			.select('-__v')
			.exec();

		if (!attendance) {
			this.logger.error('Attendance not found!');

			throw new NotFoundException('Attendance not found!');
		}

		this.logger.debug('Found attendance', attendance);

		this.logger.log('Retrieved attendance');

		return attendance;
	}

	async update(id: string, updateAttendanceDto: CreateAttendanceDto) {
		const existingAttendance = await this.attendanceModel
			.findOne({ _id: id })
			.exec();

		if (!existingAttendance) {
			this.logger.error('Attendance not found!');

			throw new NotFoundException('Attendance not found!');
		}

		this.logger.debug('Found attendance', existingAttendance);

		this.logger.debug('Updating attendance');

		existingAttendance.set(updateAttendanceDto);

		const attendance = await existingAttendance.save();

		this.logger.debug('Attendance updated ', attendance);
		this.logger.log('Attendance updated ');

		return attendance;
	}
}
