import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
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
		try {
			const checkSlotExist = await this.slotModel
				.findOne({
					class: createSlotDto.class,
					room: createSlotDto.room,
					start: createSlotDto.start,
					end: createSlotDto.end,
				})
				.exec();

			this.logger.debug('Slot found', checkSlotExist);

			if (checkSlotExist) {
				this.logger.error('Slot already exists!');

				throw new ConflictException('Slot already exists!');
			}

			const newSlot = new this.slotModel(createSlotDto);

			this.logger.debug('Created new slot', newSlot);

			return await newSlot.save();
		} catch (error: any) {
			this.logger.error('Failed to create slot!', error);

			throw new InternalServerErrorException('Failed to create slot!');
		}
	}

	async getAll(): Promise<Slot[]> {
		try {
			const slots = await this.slotModel
				.find()
				.select('-__v')
				.populate({ select: '-__v', path: 'class', model: 'Class' })
				.exec();

			this.logger.debug('Found slots', slots);

			return slots;
		} catch (error: any) {
			this.logger.error('Failed to get slots!', error);

			throw new InternalServerErrorException('Failed to get slots!');
		}
	}

	async getById(id: string): Promise<Slot> {
		try {
			const slot = await this.slotModel
				.findById(id)
				.select('-__v')
				.populate({ select: '-__v', path: 'class', model: 'Class' })
				.exec();

			this.logger.debug('Found slot', slot);

			if (!slot) {
				this.logger.error(`Slot with id ${id} not found!`);

				throw new NotFoundException(`Slot with id ${id} not found!`);
			}

			return slot;
		} catch (error: any) {
			this.logger.error('Failed to get slot!', error);

			throw new InternalServerErrorException('Failed to get slot!');
		}
	}

	async update(id: string, updateSlotDto: UpdateSlotDto) {
		try {
			const slot = await this.slotModel.findById(id).select('-__v').exec();

			this.logger.debug('Found slot', slot);

			if (!slot) {
				this.logger.error(`Slot with id ${id} not found!`);

				throw new NotFoundException(`Slot with id ${id} not found!`);
			}

			slot.set(updateSlotDto);

			this.logger.debug('Updated slot', slot);

			return await slot.save();
		} catch (error: any) {
			this.logger.error('Failed to update slot!', error);

			throw new InternalServerErrorException('Failed to update slot!');
		}
	}
}
