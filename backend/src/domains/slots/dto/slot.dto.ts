import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateSlotDto {
	@ApiProperty({ description: 'Class offered by the Slot' })
	@IsString()
	@IsNotEmpty()
	class: string;

	@ApiProperty({ description: 'Room of Slot' })
	@IsString()
	@IsNotEmpty()
	room: string;

	@ApiProperty({ description: 'Start time of Slot' })
	@IsISO8601()
	@IsNotEmpty()
	start: Date;

	@ApiProperty({ description: 'End time of Slot' })
	@IsISO8601()
	@IsNotEmpty()
	end: Date;

	@ApiProperty({ description: 'Attendances offered by the Slot' })
	@IsArray()
	@IsNotEmpty()
	attendances: string[];
}

export class UpdateSlotDto {
	@ApiPropertyOptional({ description: 'Class offered by the Slot' })
	class: string;

	@ApiPropertyOptional({ description: 'Room of Slot' })
	room: string;

	@ApiPropertyOptional({ description: 'Start time of Slot' })
	start: Date;

	@ApiPropertyOptional({ description: 'End time of Slot' })
	end: Date;

	@ApiPropertyOptional({ description: 'Attendances offered by the Slot' })
	attendances: string[];

	@ApiPropertyOptional({ description: 'Confirm teacher have taught this slot' })
	isDone: boolean;
}
