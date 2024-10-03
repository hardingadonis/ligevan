import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
	@ApiProperty({ description: 'Admin full name' })
	@IsNotEmpty()
	fullName: string;

	@ApiProperty({ description: 'Admin username' })
	@IsNotEmpty()
	username: string;

	@ApiProperty({ description: 'Admin password' })
	@IsNotEmpty()
	password: string;
}

export class UpdateAdminDto {
	@ApiPropertyOptional({ description: 'Admin full name' })
	fullName?: string;

	@ApiPropertyOptional({ description: 'Admin password' })
	password?: string;
}
