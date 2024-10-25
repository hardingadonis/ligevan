import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
	@ApiProperty({ description: 'Admin full name' })
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@ApiProperty({ description: 'Admin username' })
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({ description: 'Admin password' })
	@IsString()
	@IsNotEmpty()
	password: string;
}

export class UpdateAdminDto {
	@ApiPropertyOptional({ description: 'Admin full name' })
	fullName?: string;

	@ApiPropertyOptional({ description: 'Admin password' })
	password?: string;
}

export class ChangePasswordDto {
	@ApiProperty({ description: 'Admin current password' })
	@IsString()
	@IsNotEmpty()
	currentPassword: string;

	@ApiProperty({ description: 'Admin new password' })
	@IsString()
	@IsNotEmpty()
	newPassword: string;
}
