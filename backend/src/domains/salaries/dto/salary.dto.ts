import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSalaryDto {
	@ApiProperty({ description: 'Teacher offered by the Salary' })
	@IsString()
	@IsNotEmpty()
	teacher: string;

	@ApiProperty({ description: 'Start date to calculate salary' })
	@IsDateString()
	@IsNotEmpty()
	start: Date;

	@ApiProperty({ description: 'End date to calculate salary' })
	@IsDateString()
	@IsNotEmpty()
	end: Date;

	@ApiProperty({ description: 'Final salary of the teacher' })
	@IsNumber()
	@IsNotEmpty()
	finalSalary: number;
}
export class UpdateSalaryDto {
	@ApiPropertyOptional({ description: 'Teacher offered by the Salary' })
	teacher: string;

	@ApiPropertyOptional({ description: 'Start date to calculate salary' })
	start: Date;

	@ApiPropertyOptional({ description: 'End date to calculate salary' })
	end: Date;

	@ApiPropertyOptional({ description: 'Final salary of the teacher' })
	finalSalary: number;
}
