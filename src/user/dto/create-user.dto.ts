import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { perssonelType } from 'src/enums/perssonel-type.enum';

export class CreateUserDto {
  @IsNumber({}, { each: true })
  doc_numbers: number[];

  @IsNumber()
  role_id: number;

  @IsOptional()
  @IsEnum(perssonelType)
  perssonel_type: perssonelType;
}
