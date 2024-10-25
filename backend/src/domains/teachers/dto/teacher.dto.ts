import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsDateString,
	IsEmail,
	IsIn,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
} from 'class-validator';

export class CreateTeacherDto {
	@ApiProperty({ description: 'Teacher full name' })
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@ApiProperty({ description: 'Teacher email' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: 'Teacher password' })
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty({ description: 'Teacher phone' })
	@IsPhoneNumber('VN')
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ description: 'Teacher address' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ description: 'Teacher avatar' })
	@IsOptional()
	avatar?: string;

	@ApiProperty({ description: 'Teacher gender' })
	@IsIn(['male', 'female'])
	@IsNotEmpty()
	gender: string;

	@ApiProperty({ description: 'Teacher date of birth' })
	@IsDateString()
	@IsNotEmpty()
	dob: Date;

	@ApiProperty({ description: 'Center offered by the Teacher ' })
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

	@ApiPropertyOptional({ description: 'Center offered by the Teacher ' })
	center?: string;

	@ApiPropertyOptional({ description: 'Classes offered by the Teacher ' })
	classes?: string[];
}

export class ChangePasswordDto {
	@ApiProperty({ description: 'Teacher current password' })
	@IsString()
	@IsNotEmpty()
	currentPassword: string;

	@ApiProperty({ description: 'Teacher new password' })
	@IsString()
	@IsNotEmpty()
	newPassword: string;
}
