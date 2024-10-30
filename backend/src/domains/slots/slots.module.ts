import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SlotsController } from '@/domains/slots/slots.controller';
import { SlotsService } from '@/domains/slots/slots.service';
import { ClassSchema } from '@/schemas/class.schema';
import { SlotSchema } from '@/schemas/slot.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Slot', schema: SlotSchema },
			{ name: 'Class', schema: ClassSchema },
		]),
	],
	controllers: [SlotsController],
	providers: [SlotsService],
	exports: [SlotsService],
})
export class SlotsModule {}
