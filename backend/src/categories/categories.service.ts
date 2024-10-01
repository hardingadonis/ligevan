import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { updateCategoryDto, CategoryDto } from './dtos/category.dto';

@Injectable()
export class CategoriesService {
	constructor(private prisma: PrismaService) {}
	async getAll(): Promise<Category[]> {
		return this.prisma.category.findMany();
	}

	async getById(id: string): Promise<Category> {
		return this.prisma.category.findUnique({
			where: { id },
		});
	}

	async update(id: string, body: updateCategoryDto) {
		const category = await this.prisma.category.update({
			where: {
				id: id,
			},
			data: {
				...body,
			},
		});
		return category;
	}

	async create(body: CategoryDto) {
		const category = await this.prisma.category.create({
			data: {
				...body,
			},
		});
		return category;
	}
}
