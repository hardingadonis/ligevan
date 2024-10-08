import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Slot } from '@/schemas/slot.schema';

@Injectable()
export class SlotsService {
	private readonly logger = new Logger(SlotsService.name);

	constructor(
		@InjectModel(Slot.name) private readonly slotModel: Model<Slot>,
	) {}
}
