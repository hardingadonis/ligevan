import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class createVoucherDto {
	@IsNotEmpty()
	title: string;

	description?: string;

	@IsNotEmpty()
	@IsNumber()
	value: number;

	@IsNotEmpty()
	@IsDateString()
	due: Date;
}

export class updateVoucherDto {
	title?: string;

	description?: string;

	value?: number;

	due?: Date;
}
