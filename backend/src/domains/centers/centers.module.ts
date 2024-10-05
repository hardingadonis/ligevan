import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CenterSchema } from '@/schemas/center.schema';
import { CentersService } from '@/domains/centers/centers.service';
import { CentersController } from '@/domains/centers/centers.controller';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Center', schema: CenterSchema }]),
	],
	controllers: [CentersController],
	providers: [CentersService],
	exports: [CentersService],
})
export class CentersModule {}
