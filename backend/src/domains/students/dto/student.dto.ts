import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
	@ApiProperty({ description: 'Student full name' })
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@ApiProperty({ description: 'Student email' })
	@IsString()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: 'Student password' })
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty({ description: 'Student phone' })
	@IsString()
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ description: 'Student address' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ description: 'Student gender' })
	@IsIn(['male', 'female'])
	@IsNotEmpty()
	gender: string;

	@ApiProperty({ description: 'Student date of birth' })
	@IsNotEmpty()
	dob: Date;

	@ApiProperty({ description: 'List of classes the student is enrolled in' })
	@IsArray()
	@IsNotEmpty()
	classes: string[];

	// @ApiProperty({
	// 	description:
	// 		'List of payment methods or transactions associated with the student',
	// })
	// @IsArray()
	// @IsNotEmpty()
	// payments: string[];
}

export class UpdateStudentDto {
	@ApiPropertyOptional({ description: 'Student full name' })
	fullName?: string;

	@ApiPropertyOptional({ description: 'Student password' })
	password?: string;

	@ApiPropertyOptional({ description: 'Student phone' })
	phone?: string;

	@ApiPropertyOptional({ description: 'Student address' })
	address?: string;

	@ApiPropertyOptional({ description: 'Student gender' })
	gender?: string;

	@ApiPropertyOptional({ description: 'Student date of birth' })
	dob?: Date;

	@ApiPropertyOptional({
		description: 'List of classes the student is enrolled in',
	})
	classes?: string[];

	// @ApiPropertyOptional({
	// 	description:
	// 		'List of payment methods or transactions associated with the student',
	// })
	// payments?: string[];
}
