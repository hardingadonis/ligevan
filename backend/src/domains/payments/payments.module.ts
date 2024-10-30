import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MomoModule } from '@/domains/payments//momo/momo.module';
import { PaymentsController } from '@/domains/payments/payments.controller';
import { PaymentsService } from '@/domains/payments/payments.service';
import { ZalopayModule } from '@/domains/payments/zalopay/zalopay.module';
import { ClassSchema } from '@/schemas/class.schema';
import { PaymentSchema } from '@/schemas/payment.schema';
import { StudentSchema } from '@/schemas/student.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Payment', schema: PaymentSchema },
			{ name: 'Student', schema: StudentSchema },
			{ name: 'Class', schema: ClassSchema },
		]),
		ZalopayModule,
		MomoModule,
	],
	controllers: [PaymentsController],
	providers: [PaymentsService],
	exports: [PaymentsService],
})
export class PaymentsModule {}
