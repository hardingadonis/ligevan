import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAttendanceDto } from '@/domains/attendances/dto/attendance.dto';
import { SlotsService } from '@/domains/slots/slots.service';
import { Attendance } from '@/schemas/attendance.schema';
import { Slot } from '@/schemas/slot.schema';

@Injectable()
export class AttendancesService {
	private readonly logger = new Logger(AttendancesService.name);

	constructor(
		@InjectModel(Attendance.name)
		private readonly attendanceModel: Model<Attendance>,
		@InjectModel(Slot.name) private readonly slotModel: Model<Slot>,
		private readonly slotsService: SlotsService,
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

	private async populateAttendance(query) {
		return query
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
	}

	async getAll() {
		const attendances = await this.populateAttendance(
			this.attendanceModel.find(),
		);

		if (!attendances) {
			this.logger.error('Attendances not found!');

			throw new NotFoundException('Attendances not found!');
		}

		this.logger.debug('Found attendances', attendances);

		this.logger.log('Retrieved attendances');

		return attendances;
	}

	async getById(id: string) {
		const attendance = await this.populateAttendance(
			this.attendanceModel.findById(id),
		);

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

	async createAttendancesForSlot(slotId: string, listStudentId: string[]) {
		const slot = await this.slotModel.findById(slotId);

		if (!slot) {
			this.logger.error('Slot not found!');
			throw new NotFoundException('Slot not found!');
		}

		const attendanceDocs = listStudentId.map((studentId) => ({
			student: studentId,
			slot: slotId,
		}));

		this.logger.debug('Creating new attendances', attendanceDocs);

		const createdAttendances =
			await this.attendanceModel.insertMany(attendanceDocs);

		const attendanceIds = createdAttendances.map((attendance) =>
			attendance._id.toString(),
		);

		await this.slotsService.update(slotId, { attendances: attendanceIds });

		return createdAttendances;
	}

	async updateAttendance(
		slotId: string,
		attendanceUpdates: { studentId: string; status: string }[],
	) {
		const bulkOps = attendanceUpdates.map(({ studentId, status }) => ({
			updateOne: {
				filter: { slot: slotId, student: studentId },
				update: { $set: { status } },
				upsert: true,
			},
		}));

		this.logger.debug('Updating attendances', bulkOps);

		return this.attendanceModel.bulkWrite(bulkOps);
	}
}
