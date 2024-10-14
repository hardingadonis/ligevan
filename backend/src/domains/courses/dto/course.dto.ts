import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
	@ApiProperty({ description: 'Course code' })
	@IsString()
	@IsNotEmpty()
	code: string;

	@ApiProperty({ description: 'Course title' })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ description: 'Course description' })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ description: 'Course thumbnail' })
	@IsString()
	@IsNotEmpty()
	thumbnail: string;

	@ApiProperty({ description: 'Course price' })
	@IsNumber()
	@IsNotEmpty()
	price: number;
}

export class UpdateCourseDto {
	@ApiPropertyOptional({ description: 'Course title' })
	title?: string;

	@ApiPropertyOptional({ description: 'Course description' })
	description?: string;

	@ApiPropertyOptional({ description: 'Course thumbnail' })
	thumbnail?: string;

	@ApiPropertyOptional({ description: 'Course price' })
	price?: number;
}
