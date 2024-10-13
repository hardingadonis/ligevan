import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginDto {
	@ApiProperty({ description: 'Admin username' })
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({ description: 'Admin password' })
	@IsString()
	@IsNotEmpty()
	password: string;
}
