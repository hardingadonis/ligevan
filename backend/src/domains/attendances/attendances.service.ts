import {
	Injectable,
	InternalServerErrorException,
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
		try {
			const attendanceIsExist = await this.attendanceModel.findOne({
				student: createAttendanceDto.student,
				slot: createAttendanceDto.slot,
			});

			this.logger.debug('Attendance found', attendanceIsExist);

			if (attendanceIsExist) {
				this.logger.error('Attendance already exists!');

				throw new NotFoundException('Attendance already exists!');
			}

			const attendance = new this.attendanceModel(createAttendanceDto);

			this.logger.debug('Created new attendance', attendance);

			return await attendance.save();
		} catch (error: any) {
			this.logger.error('Failed to create attendance!', error);

			throw new InternalServerErrorException('Failed to create attendance!');
		}
	}

	async getAll() {
		try {
			const attendances = await this.attendanceModel
				.find()
				.populate({
					select: '-__v -hashedPassword',
					path: 'student',
					model: 'Student',
				})
				.populate({
					select: '-__v',
					path: 'slot',
					model: 'Slot',
				})
				.select('-__v');

			this.logger.debug('Attendances found', attendances);

			return attendances;
		} catch (error: any) {
			this.logger.error('Failed to get attendances!', error);

			throw new InternalServerErrorException('Failed to get attendances!');
		}
	}

	async getById(id: string) {
		try {
			const attendance = await this.attendanceModel
				.findById(id)
				.populate({
					select: '-__v -hashedPassword',
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

			return attendance;
		} catch (error: any) {
			this.logger.error('Failed to get attendance!', error);

			throw new InternalServerErrorException(
				'Failed to get attendance!',
				error,
			);
		}
	}

	async update(id: string, updateAttendanceDto: CreateAttendanceDto) {
		try {
			const attendance = await this.attendanceModel
				.findOne({ _id: id })
				.select('-__v')
				.exec();

			this.logger.debug('Found attendance', attendance);

			if (!attendance) {
				this.logger.error('Attendance not found!');

				throw new NotFoundException('Attendance not found!');
			}

			const updatedAttendance = await this.attendanceModel
				.findOneAndUpdate(
					{ _id: id },
					{ ...updateAttendanceDto },
					{ new: true },
				)
				.select('-__v')
				.exec();

			this.logger.debug('Updated attendance', updatedAttendance);

			return updatedAttendance;
		} catch (error: any) {
			this.logger.error('Failed to update attendance!', error);

			throw new InternalServerErrorException('Failed to update attendance!');
		}
	}
}
