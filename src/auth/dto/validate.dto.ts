import { IsString } from 'class-validator';

export class validateUserDto {
  @IsString()
  entity: string;

  @IsString()
  permissions: string;
}
