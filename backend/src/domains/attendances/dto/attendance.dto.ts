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

	@ApiProperty({ description: 'Attendance status' })
	@IsIn(['attended', 'absent', 'not-yet'])
	@IsNotEmpty()
	status: string;
}

export class UpdateAttendanceDto {
	@ApiPropertyOptional({ description: 'Student offered by the Attendance' })
	student: string;

	@ApiPropertyOptional({ description: 'Slot offered by the Attendance' })
	slot: string;

	@ApiPropertyOptional({ description: 'Attendance status' })
	status: string;
}
