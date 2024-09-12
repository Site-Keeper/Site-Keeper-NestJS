import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete project report',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A detailed description of the task',
    example: 'Write a comprehensive report on the project’s progress and outcomes.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The current state of the task',
    enum: Status,
    example: Status.PENDING,
  })
  @IsEnum(Status)
  state: Status;

  @ApiProperty({
    description: 'The ID of the space associated with the task',
    example: 1,
  })
  @IsInt()
  space_id: number;

  @ApiPropertyOptional({
    description: 'The ID of an optional object related to the task',
    example: 123,
  })
  @IsOptional()
  @IsInt()
  object_id?: number;

  @ApiProperty({
    description: 'Indicates whether the task is deleted',
    example: false,
  })
  @IsBoolean()
  is_deleted: boolean;

  @ApiProperty({
    description: 'The ID of the routine associated with the task',
    example: 1,
  })
  @IsInt()
  routine_id: number;

  @ApiProperty({
    description: 'The ID of the topic associated with the task',
    example: 1,
  })
  @IsInt()
  topic_id: number;
}
