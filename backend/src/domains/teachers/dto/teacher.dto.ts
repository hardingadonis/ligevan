import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherDto {
	@ApiProperty({ description: 'Teacher full name' })
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@ApiProperty({ description: 'Teacher email' })
	@IsString()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: 'Teacher password' })
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty({ description: 'Teacher phone' })
	@IsString()
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ description: 'Teacher address' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiPropertyOptional({ description: 'Teacher avatar' })
	avatar?: string;

	@ApiProperty({ description: 'Teacher gender' })
	@IsString()
	@IsNotEmpty()
	gender: string;

	@ApiProperty({ description: 'Teacher date of birth' })
	@IsNotEmpty()
	dob: Date;

	@ApiProperty({ description: 'The center is where teachers teach' })
	@IsString()
	@IsNotEmpty()
	center: string;
}

export class UpdateTeacherDto {
	@ApiPropertyOptional({ description: 'Teacher full name' })
	fullName?: string;

	@ApiPropertyOptional({ description: 'Teacher password' })
	password?: string;

	@ApiPropertyOptional({ description: 'Teacher phone' })
	phone?: string;

	@ApiPropertyOptional({ description: 'Teacher address' })
	address?: string;

	@ApiPropertyOptional({ description: 'Teacher avatar' })
	avatar?: string;

	@ApiPropertyOptional({ description: 'Teacher gender' })
	gender?: string;

	@ApiPropertyOptional({ description: 'Teacher date of birth' })
	dob?: Date;
}
