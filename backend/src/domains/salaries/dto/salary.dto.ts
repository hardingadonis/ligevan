import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSalaryDto {
	@ApiProperty({ description: 'Salary of Teacher' })
	@IsString()
	@IsNotEmpty()
	teacher: string;

	@ApiProperty({ description: 'Start date to calculate salary' })
	@IsISO8601()
	@IsNotEmpty()
	start: Date;

	@ApiProperty({ description: 'End date to calculate salary' })
	@IsISO8601()
	@IsNotEmpty()
	end: Date;

	@ApiProperty({ description: 'Final salary of the teacher' })
	@IsNumber()
	@IsNotEmpty()
	finalSalary: number;
}
export class UpdateSalaryDto {
	@ApiPropertyOptional({ description: 'Salary of Teacher' })
	teacher: string;

	@ApiPropertyOptional({ description: 'Start date to calculate salary' })
	start: Date;

	@ApiPropertyOptional({ description: 'End date to calculate salary' })
	end: Date;

	@ApiPropertyOptional({ description: 'Final salary of the teacher' })
	finalSalary: number;
}
