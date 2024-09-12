import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task.',
    example: 'Complete project report',
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A detailed description of the task.',
    example: 'Prepare the final report for the project and submit it by the end of the week.',
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The current state of the task, as defined in the Status enum.',
    example: Status.PENDING,
    enum: Status,
  })
  @IsEnum(Status)
  state: Status;

  @ApiProperty({
    description: 'The ID of the space to which the task belongs.',
    example: 1,
    type: Number,
  })
  @IsInt()
  space_id: number;

  @ApiPropertyOptional({
    description: 'The ID of the object associated with the task (optional).',
    example: 42,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  object_id?: number;

  @ApiProperty({
    description: 'Indicates whether the task is deleted or not.',
    example: false,
    type: Boolean,
  })
  @IsBoolean()
  is_deleted: boolean;

  @ApiProperty({
    description: 'The ID of the routine to which the task is related.',
    example: 3,
    type: Number,
  })
  @IsInt()
  routine_id: number;

  @ApiProperty({
    description: 'The ID of the topic associated with the task.',
    example: 7,
    type: Number,
  })
  @IsInt()
  topic_id: number;

  @IsInt()
  created_by: number;

  @IsInt()
  updated_by: number;
}
