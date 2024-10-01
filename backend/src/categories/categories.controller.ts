import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from '@prisma/client';
import { updateCategoryDto, CategoryDto } from './dtos/category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}

	@Get()
	getAll(): Promise<Category[]> {
		return this.categoryService.getAll();
	}

	@Get(':id')
	getById(@Param('id') id: string): Promise<Category> {
		return this.categoryService.getById(id);
	}

	@Post()
	create(@Body() body: CategoryDto): Promise<Category> {
		return this.categoryService.create(body);
	}

	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() body: updateCategoryDto,
	): Promise<Category> {
		return this.categoryService.update(id, body);
	}
}
