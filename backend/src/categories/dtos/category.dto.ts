import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	description: string;
}

export class updateCategoryDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	description: string;
}
