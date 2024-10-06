import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CentersController } from '@/domains/centers/centers.controller';
import { CentersService } from '@/domains/centers/centers.service';
import { CenterSchema } from '@/schemas/center.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Center', schema: CenterSchema }]),
	],
	controllers: [CentersController],
	providers: [CentersService],
	exports: [CentersService],
})
export class CentersModule {}
