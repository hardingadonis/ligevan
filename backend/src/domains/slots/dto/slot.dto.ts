import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateSlotDto {
	@ApiProperty({ description: 'Class have slot' })
	@IsString()
	@IsNotEmpty()
	class: string;

	@ApiProperty({ description: 'Room of slot' })
	@IsString()
	@IsNotEmpty()
	room: string;

	@ApiProperty({ description: 'Start time of slot' })
	@IsNotEmpty()
	start: Date;

	@ApiProperty({ description: 'End time of slot' })
	@IsNotEmpty()
	end: Date;

	@ApiProperty({ description: 'Attendances of slot' })
	@IsArray()
	@IsNotEmpty()
	attendances: string[];
}

export class UpdateSlotDto {
	@ApiPropertyOptional({ description: 'Class have slot' })
	class: string;

	@ApiPropertyOptional({ description: 'Room of slot' })
	room: string;

	@ApiPropertyOptional({ description: 'Start time of slot' })
	start: Date;

	@ApiPropertyOptional({ description: 'End time of slot' })
	end: Date;

	@ApiPropertyOptional({ description: 'Attendances of slot' })
	attendances: string[];
}
