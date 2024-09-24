import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { personnelType } from 'src/enums/personnel-type.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Array of document numbers',
    example: [12345678, 87654321],
    type: [Number],
  })
  @IsNumber({}, { each: true })
  doc_numbers: number[];

  @ApiProperty({
    description: 'The ID of the role associated with the user',
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @Max(3)
  role_id: number;

  @ApiPropertyOptional({
    description: 'The type of personnel',
    enum: personnelType,
    example: personnelType.JANITORIAL,
  })
  @IsOptional()
  @IsEnum(personnelType)
  personnel_type?: personnelType;
}
