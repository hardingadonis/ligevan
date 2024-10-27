import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import zalopayConfig from '@/domains/payments/zalopay/config/zalopay.config';
import { ZalopayService } from '@/domains/payments/zalopay/zalopay.service';

@Module({
	imports: [ConfigModule.forFeature(zalopayConfig)],
	providers: [ZalopayService],
	exports: [ZalopayService],
})
export class ZalopayModule {}
