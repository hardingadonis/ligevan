import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsArray,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
} from 'class-validator';

export class CreateCenterDto {
	@ApiProperty({ description: 'Center name' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'Center address' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ description: 'Center phone number' })
	@IsPhoneNumber('VN')
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ description: 'Center email' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: 'Courses offered by the center' })
	@IsArray()
	@IsOptional()
	courses: string[];

	@ApiProperty({ description: 'Vouchers offered by the center' })
	@IsArray()
	@IsOptional()
	vouchers: string[];

	@ApiProperty({ description: 'Teachers offered by the center' })
	@IsArray()
	@IsOptional()
	teachers: string[];

	@ApiProperty({ description: 'Classes offered by the center' })
	@IsArray()
	@IsOptional()
	classes: string[];
}

export class UpdateCenterDto {
	@ApiPropertyOptional({ description: 'Center name' })
	name?: string;

	@ApiPropertyOptional({ description: 'Center address' })
	address?: string;

	@ApiPropertyOptional({ description: 'Center phone number' })
	phone?: string;

	@ApiPropertyOptional({ description: 'Center email' })
	email?: string;

	@ApiPropertyOptional({ description: 'Courses offered by the center' })
	courses?: string[];

	@ApiPropertyOptional({ description: 'Vouchers offered by the center' })
	vouchers?: string[];

	@ApiPropertyOptional({ description: 'Teachers offered by the center' })
	teachers?: string[];

	@ApiPropertyOptional({ description: 'Classes offered by the center' })
	classes?: string[];
}
