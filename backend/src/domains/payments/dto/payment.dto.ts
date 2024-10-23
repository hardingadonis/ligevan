import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreatePaymentDto {
	@ApiProperty({ description: 'Student offered by the Payment' })
	@IsString()
	@IsNotEmpty()
	student: string;

	@ApiProperty({ description: 'Course offered by the Payment' })
	@IsString()
	@IsNotEmpty()
	course: string;

	@ApiProperty({ description: 'Class offered by the Payment' })
	@IsString()
	@IsNotEmpty()
	class: string;

	@ApiProperty({ description: 'Voucher offered by the Payment' })
	@IsString()
	@IsOptional()
	voucher: string;

	@ApiProperty({ description: 'Origin Price of Payment' })
	@IsNumber()
	@IsNotEmpty()
	originPrice: number;

	@ApiProperty({ description: 'Final Price of Payment' })
	@IsNumber()
	@IsNotEmpty()
	finalPrice: number;

	@ApiProperty({ description: 'Method of Payment' })
	@IsIn(['vn-pay', 'momo', 'zalo-pay'])
	@IsNotEmpty()
	method: string;
}

export class UpdatePaymentDto {
	@ApiPropertyOptional({ description: 'Student offered by the Payment' })
	student: string;

	@ApiPropertyOptional({ description: 'Course offered by the Payment' })
	course: string;

	@ApiPropertyOptional({ description: 'Class offered by the Payment' })
	class: string;

	@ApiPropertyOptional({ description: 'Voucher offered by the Payment' })
	voucher: string;

	@ApiPropertyOptional({ description: 'Origin Price of Payment' })
	originPrice: number;

	@ApiPropertyOptional({ description: 'Final Price of Payment' })
	finalPrice: number;

	@ApiPropertyOptional({ description: 'Method of Payment' })
	@IsIn(['vn-pay', 'momo', 'zalo-pay'])
	method: string;
}
