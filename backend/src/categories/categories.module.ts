import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';
import { CategoriesService } from './categories.service';

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService, PrismaService],
})
export class CategoriesModule {}
