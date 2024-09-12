import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { PrivateService } from 'src/common/decorators/permissions.decorator';
import { UserJWT } from 'src/common/interfaces/jwt.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PrivateService()
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  validate(@Request() req) {
    const user = req.user as UserJWT;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.login({
      doc_number: +signInDto.doc_number,
      password: signInDto.password,
    });
  }
}
