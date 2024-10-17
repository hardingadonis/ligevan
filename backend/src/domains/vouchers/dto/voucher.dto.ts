import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVoucherDto {
	@ApiProperty({ description: 'Voucher code' })
	@IsString()
	@IsNotEmpty()
	code: string;

	@ApiProperty({ description: 'Voucher title' })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ description: 'Voucher description' })
	@IsString()
	description?: string;

	@ApiProperty({ description: 'Monetary discount amount of the voucher (%)' })
	@IsNumber()
	@IsNotEmpty()
	value: number;

	@ApiProperty({ description: 'Voucher start date' })
	@IsDateString()
	@IsNotEmpty()
	start: Date;

	@ApiProperty({ description: 'Voucher end date' })
	@IsDateString()
	@IsNotEmpty()
	end: Date;
}

export class UpdateVoucherDto {
	@ApiPropertyOptional({ description: 'Voucher title' })
	title?: string;

	@ApiPropertyOptional({ description: 'Voucher description' })
	description?: string;

	@ApiPropertyOptional({
		description: 'Monetary discount amount of the voucher (%)',
	})
	value?: number;

	@ApiPropertyOptional({ description: 'Voucher start date' })
	start?: Date;

	@ApiPropertyOptional({ description: 'Voucher end date' })
	end?: Date;
}
