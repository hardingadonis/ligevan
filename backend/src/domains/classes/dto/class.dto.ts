import { Schema } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class CreateClassDto {
	@ApiProperty({ description: 'Class name' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'The center is where classes take place' })
	@IsString()
	@IsNotEmpty()
	center: string;

	@ApiProperty({ description: 'The teacher is responsible for the class' })
	@IsString()
	@IsNotEmpty()
	teacher: string;

	// @ApiProperty({ description: 'The students are in the class' })
	// @IsString()
	// @IsNotEmpty()
	// students: string[];

	// @ApiProperty({ description: 'The slots are in the class' })
	// @IsString()
	// @IsNotEmpty()
	// slots: string[];
}

export class UpdateClassDto {
	@ApiPropertyOptional({ description: 'Class name' })
	name?: string;

	@ApiPropertyOptional({
		description: 'The center is where classes take place',
	})
	center?: string;

	@ApiPropertyOptional({
		description: 'The teacher is responsible for the class',
	})
	teacher?: string;

	// @ApiPropertyOptional({ description: 'The students are in the class' })
	// students?: string[];

	// @ApiPropertyOptional({ description: 'The slots are in the class' })
	// slots?: string[];
}
