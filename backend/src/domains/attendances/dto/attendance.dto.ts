import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateAttendanceDto {
	@ApiProperty({ description: 'Student offered by the Attendance' })
	@IsString()
	@IsNotEmpty()
	student: string;

	@ApiProperty({ description: 'Slot offered by the Attendance' })
	@IsString()
	@IsNotEmpty()
	slot: string;
}

export class UpdateAttendanceDto {
	@ApiPropertyOptional({ description: 'Student offered by the Attendance' })
	student: string;

	@ApiPropertyOptional({ description: 'Slot offered by the Attendance' })
	slot: string;

	@ApiPropertyOptional({ description: 'Attendance status' })
	@IsIn(['attended', 'absent'])
	status: string;
}
