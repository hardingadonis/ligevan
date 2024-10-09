import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentsController } from '@/domains/payments/payments.controller';
import { PaymentsService } from '@/domains/payments/payments.service';
import { PaymentSchema } from '@/schemas/payment.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
	],
	controllers: [PaymentsController],
	providers: [PaymentsService],
	exports: [PaymentsService],
})
export class PaymentsModule {}
