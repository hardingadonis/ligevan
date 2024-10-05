import { Module } from '@nestjs/common';
import { CentersService } from './centers.service';

@Module({
	providers: [CentersService],
})
export class CentersModule {}
