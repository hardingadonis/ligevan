import { Schema } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class CreateClassDto {
	@ApiProperty({ description: 'Class name' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'Center offered by the Class' })
	@IsString()
	@IsNotEmpty()
	center: string;

	@ApiProperty({ description: 'Teachers offered by the Class' })
	@IsString()
	@IsNotEmpty()
	teacher: string;

	@ApiProperty({ description: 'Students offered by the Class' })
	@IsArray()
	@IsNotEmpty()
	students: string[];

	@ApiProperty({ description: 'Slot offered by the Class' })
	@IsArray()
	@IsNotEmpty()
	slots: string[];
}

export class UpdateClassDto {
	@ApiPropertyOptional({ description: 'Class name' })
	name?: string;

	@ApiPropertyOptional({
		description: 'Center offered by the Class ',
	})
	center?: string;

	@ApiPropertyOptional({
		description: 'Teachers offered by the Class',
	})
	teacher?: string;

	@ApiPropertyOptional({ description: 'Students offered by the Class' })
	students?: string[];

	@ApiPropertyOptional({ description: 'Slot offered by the Class ' })
	slots?: string[];
}
