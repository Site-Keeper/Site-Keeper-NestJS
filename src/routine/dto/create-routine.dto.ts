import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

export class CreateRoutineDto {
  @ApiProperty({
    description: 'The name of the routine',
    example: 'Morning Exercise',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The start time of the routine',
    example: '2024-09-12T06:00:00Z',
    type: String,
  })
  @IsDate()
  @Type(() => Date)
  start_time: Date;

  @ApiProperty({
    description: 'The end time of the routine',
    example: '2024-09-12T07:00:00Z',
    type: String,
  })
  @IsDate()
  @Type(() => Date)
  end_time: Date;

  @ApiProperty({
    description: 'The days of the week the routine is scheduled for',
    example: ['Monday', 'Wednesday', 'Friday'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  days: string[];

  @ApiProperty({
    description: 'The ID of the user assigned to this routine',
    example: 1,
  })
  @IsNumber()
  assigned_to: number;

  @ApiProperty({
    description: 'Indicates whether the routine is deleted',
    example: false,
  })
  @IsBoolean()
  is_deleted: boolean;

  @ApiProperty({
    description: 'The task associated with this routine',
    type: [CreateTaskDto],
  })
  @IsArray()
  @Type(() => CreateTaskDto)
  task: CreateTaskDto[]
}
