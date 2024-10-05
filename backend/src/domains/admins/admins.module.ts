import { Module } from '@nestjs/common';
import { AdminsController } from '@/domains/admins/admins.controller';
import { AdminsService } from '@/domains/admins/admins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '@/schemas/admin.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
	],
	controllers: [AdminsController],
	providers: [AdminsService],
	exports: [AdminsService],
})
export class AdminsModule {}
