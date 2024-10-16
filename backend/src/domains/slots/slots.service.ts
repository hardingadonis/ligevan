import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSlotDto, UpdateSlotDto } from '@/domains/slots/dto/slot.dto';
import { Slot } from '@/schemas/slot.schema';

@Injectable()
export class SlotsService {
	private readonly logger = new Logger(SlotsService.name);

	constructor(
		@InjectModel(Slot.name) private readonly slotModel: Model<Slot>,
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

		return newSlot;
	}

	async getAll(): Promise<Slot[]> {
		const slots = await this.slotModel
			.find()
			.select('-__v')
			.populate({ select: '-__v', path: 'class', model: 'Class' })
			.exec();

		if (!slots) {
			this.logger.error('No slots found!');

			throw new NotFoundException('No slots found!');
		}

		this.logger.debug('Found all slots', slots);

		this.logger.log('Retrieved slots');

		return slots;
	}

	async getById(id: string): Promise<Slot> {
		const slot = await this.slotModel
			.findById(id)
			.select('-__v')
			.populate({ select: '-__v', path: 'class', model: 'Class' })
			.exec();

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
}
