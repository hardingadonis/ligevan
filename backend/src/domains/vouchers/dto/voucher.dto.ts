import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVoucherDto {
	@ApiProperty({ description: 'Voucher code' })
	@IsNotEmpty()
	code: string;

	@ApiProperty({ description: 'Voucher title' })
	@IsNotEmpty()
	title: string;

	@ApiProperty({ description: 'Voucher description' })
	description?: string;

	@ApiProperty({ description: 'Monetary discount amount of the voucher (%)' })
	@IsNotEmpty()
	@IsNumber()
	value: number;

	@ApiProperty({ description: 'Voucher start date' })
	@IsNotEmpty()
	@IsDateString()
	start: Date;

	@ApiProperty({ description: 'Voucher end date' })
	@IsNotEmpty()
	@IsDateString()
	end: Date;
}

export class UpdateVoucherDto {
	@ApiPropertyOptional({ description: 'Voucher code' })
	code?: string;

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
