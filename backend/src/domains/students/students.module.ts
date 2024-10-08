import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsController } from '@/domains/students/students.controller';
import { StudentsService } from '@/domains/students/students.service';
import { StudentSchema } from '@/schemas/student.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
	],
	controllers: [StudentsController],
	providers: [StudentsService],
	exports: [StudentsService],
})
export class StudentsModule {}
