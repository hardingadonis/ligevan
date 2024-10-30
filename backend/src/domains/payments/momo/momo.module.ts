import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import momoConfig from '@/domains/payments/momo/config/momo.config';
import { MomoService } from '@/domains/payments/momo/momo.service';

@Module({
	imports: [ConfigModule.forFeature(momoConfig)],
	providers: [MomoService],
	exports: [MomoService],
})
export class MomoModule {}
