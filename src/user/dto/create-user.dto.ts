import { IsNumber, IsOptional, IsString } from 'class-validator';
import { perssonelType } from 'src/enums/perssonel-type.enum';

export class CreateUserDto {
  @IsNumber()
  doc_numbers: number[];

  @IsNumber()
  role_id: number;

  @IsOptional()
  @IsString()
  perssonel_type: perssonelType;
}
