import { IsNumber, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  name: string;

  @IsNumber()
  doc_number: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string;
}
