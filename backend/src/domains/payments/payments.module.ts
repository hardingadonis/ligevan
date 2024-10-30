import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MomoModule } from '@/domains/payments//momo/momo.module';
import { PaymentsController } from '@/domains/payments/payments.controller';
import { PaymentsService } from '@/domains/payments/payments.service';
import { ZalopayModule } from '@/domains/payments/zalopay/zalopay.module';
import { PaymentSchema } from '@/schemas/payment.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
		ZalopayModule,
		MomoModule,
	],
	controllers: [PaymentsController],
	providers: [PaymentsService],
	exports: [PaymentsService],
})
export class PaymentsModule {}
