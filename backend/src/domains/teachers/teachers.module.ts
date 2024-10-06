import { Module } from '@nestjs/common';

import { TeachersService } from './teachers.service';

@Module({
	providers: [TeachersService],
})
export class TeachersModule {}
