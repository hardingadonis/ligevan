import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TeachersController } from '@/domains/teachers/teachers.controller';
import { TeachersService } from '@/domains/teachers/teachers.service';
import { CenterSchema } from '@/schemas/center.schema';
import { TeacherSchema } from '@/schemas/teacher.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Teacher', schema: TeacherSchema },
			{ name: 'Center', schema: CenterSchema },
		]),
	],
	controllers: [TeachersController],
	providers: [TeachersService],
	exports: [TeachersService],
})
export class TeachersModule {}
