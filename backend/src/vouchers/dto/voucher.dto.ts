import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVoucherDto {
	@IsNotEmpty()
	code: string;

	@IsNotEmpty()
	title: string;

	description?: string;

	@IsNotEmpty()
	@IsNumber()
	value: number;

	@IsNotEmpty()
	@IsDateString()
	start: Date;

	@IsNotEmpty()
	@IsDateString()
	end: Date;

	isDelete?: boolean;
}

export class UpdateVoucherDto {
	code?: string;

	title?: string;

	description?: string;

	value?: number;

	due?: Date;

	isDelete?: boolean;
}
