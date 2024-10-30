import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSlotDto, UpdateSlotDto } from '@/domains/slots/dto/slot.dto';
import { Class } from '@/schemas/class.schema';
import { Slot } from '@/schemas/slot.schema';

@Injectable()
export class SlotsService {
	private readonly logger = new Logger(SlotsService.name);

	constructor(
		@InjectModel(Slot.name) private readonly slotModel: Model<Slot>,
		@InjectModel(Class.name) private readonly classModel: Model<Class>,
	) {}

	async create(createSlotDto: CreateSlotDto): Promise<Slot> {
		const existingSlot = await this.slotModel
			.findOne({
				class: createSlotDto.class,
				room: createSlotDto.room,
				start: createSlotDto.start,
				end: createSlotDto.end,
			})
			.exec();

		if (existingSlot) {
			this.logger.error('Slot already exists!');

			throw new ConflictException('Slot already exists!');
		}

		const newSlot = new this.slotModel(createSlotDto);

		this.logger.debug('Creating new slot');

		await newSlot.save();

		this.logger.debug('Slot created', newSlot);
		this.logger.log('Slot created');

		await this.classModel.findByIdAndUpdate(createSlotDto.class, {
			$push: { slots: newSlot._id.toString() },
		});

		this.logger.debug('Slot added to class');

		return newSlot;
	}

	private async populateSlot(query) {
		return query
			.populate({ select: '-__v', path: 'class', model: 'Class' })
			.populate({ select: '-__v', path: 'attendances', model: 'Attendance' })
			.select('-__v');
	}

	async getAll(): Promise<Slot[]> {
		const slots = await this.populateSlot(this.slotModel.find());

		if (!slots) {
			this.logger.error('No slots found!');

			throw new NotFoundException('No slots found!');
		}

		this.logger.debug('Found all slots', slots);

		this.logger.log('Retrieved slots');

		return slots;
	}

	async getById(id: string): Promise<Slot> {
		const slot = await this.populateSlot(this.slotModel.findById(id));

		if (!slot) {
			this.logger.error(`Slot with id ${id} not found!`);

			throw new NotFoundException(`Slot with id ${id} not found!`);
		}

		this.logger.debug('Found slot', slot);

		this.logger.log('Retrieved slot');

		return slot;
	}

	async update(id: string, updateSlotDto: UpdateSlotDto) {
		const existingSlot = await this.slotModel.findById(id).exec();

		if (!existingSlot) {
			this.logger.error(`Slot with id ${id} not found!`);

			throw new NotFoundException(`Slot with id ${id} not found!`);
		}

		this.logger.debug('Found slot', existingSlot);

		existingSlot.set(updateSlotDto);

		this.logger.debug('Updating slot');

		const updateSlot = await existingSlot.save();

		this.logger.debug('Updated slot', updateSlot);
		this.logger.log('Slot updated');

		return updateSlot;
	}

	async findSlotsInRange(
		classId: string,
		startDate: Date,
		endDate: Date,
	): Promise<Slot[]> {
		return this.slotModel
			.find({
				class: classId,
				start: { $gte: startDate },
				end: { $lte: endDate },
				isDone: true,
			})
			.exec();
	}
}
