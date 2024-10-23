import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsArray,
	IsDateString,
	IsEmail,
	IsIn,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateStudentDto {
	@ApiProperty({ description: 'Student full name' })
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@ApiProperty({ description: 'Student email' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: 'Student phone' })
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ description: 'Student address' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ description: 'Student avatar' })
	@IsOptional()
	avatar?: string;

	@ApiProperty({ description: 'Student gender' })
	@IsIn(['male', 'female'])
	@IsNotEmpty()
	gender: string;

	@ApiProperty({ description: 'Student date of birth' })
	@IsDateString()
	@IsNotEmpty()
	dob: Date;

	@ApiProperty({ description: 'Classes offered by the Student' })
	@IsArray()
	@IsOptional()
	classes: string[];

	@ApiProperty({ description: 'Payments offered by the Student' })
	@IsArray()
	@IsOptional()
	payments: string[];
}

export class UpdateStudentDto {
	@ApiPropertyOptional({ description: 'Student full name' })
	fullName?: string;

	@ApiPropertyOptional({ description: 'Student phone' })
	phone?: string;

	@ApiPropertyOptional({ description: 'Student address' })
	address?: string;

	@ApiPropertyOptional({ description: 'Student avatar' })
	avatar?: string;

	@ApiPropertyOptional({ description: 'Student gender' })
	gender?: string;

	@ApiPropertyOptional({ description: 'Student date of birth' })
	dob?: Date;

	@ApiPropertyOptional({ description: 'Classes offered by the Student' })
	classes?: string[];

	@ApiPropertyOptional({ description: 'Payments offered by the Student' })
	payments?: string[];
}
