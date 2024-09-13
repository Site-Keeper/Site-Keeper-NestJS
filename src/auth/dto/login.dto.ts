import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description:
      'The document number of the user. Should be a unique identifier.',
    example: 123456,
  })
  @IsString()
  doc_number: string;

  @ApiProperty({
    description: 'The password of the user. Should be a string.',
    example: 123456,
  })
  @IsString()
  password: string;
}
