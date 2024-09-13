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
import { ApiTags } from '@nestjs/swagger';
import { ApiDocValidateUser } from './docs/validate.swagger.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiDocLogin } from './docs/auth.swagger.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PrivateService()
  @ApiDocValidateUser(User)
  @Post('validate')
  validate(@Request() req) {
    const user = req.user as UserJWT;
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiDocLogin()
  async signIn(@Body() signInDto: LoginDto) {
    return this.authService.login({
      doc_number: +signInDto.doc_number,
      password: signInDto.password,
    });
  }
}
