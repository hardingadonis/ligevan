import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class TeacherLoginDto {
	@ApiProperty({ description: 'Teacher email' })
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({ description: 'Teacher password' })
	@IsString()
	@IsNotEmpty()
	password: string;
}
