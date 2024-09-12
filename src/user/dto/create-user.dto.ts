import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { perssonelType } from 'src/enums/perssonel-type.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Array of document numbers',
    example: [12345678, 87654321],
    type: [Number], // Specify the type as an array of numbers
  })
  @IsNumber({}, { each: true })
  doc_numbers: number[];

  @ApiProperty({
    description: 'The ID of the role associated with the user',
    example: 1,
  })
  @IsNumber()
  role_id: number;

  @ApiPropertyOptional({
    description: 'The type of personnel',
    enum: perssonelType,
    example: perssonelType.JANITORIAL,
  })
  @IsOptional()
  @IsEnum(perssonelType)
  perssonel_type?: perssonelType;
}
