import { Module } from '@nestjs/common';

import { ZalopayService } from '@/domains/payments/zalopay/zalopay.service';

@Module({
	providers: [ZalopayService],
	exports: [ZalopayService],
})
export class ZalopayModule {}
