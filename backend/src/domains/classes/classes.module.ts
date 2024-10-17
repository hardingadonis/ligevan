import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClassesController } from '@/domains/classes/classes.controller';
import { ClassesService } from '@/domains/classes/classes.service';
import { ClassSchema } from '@/schemas/class.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
	],
	controllers: [ClassesController],
	providers: [ClassesService],
	exports: [ClassesService],
})
export class ClassesModule {}
