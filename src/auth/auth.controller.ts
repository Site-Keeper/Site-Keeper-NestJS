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
import {
  ApiConsumes,
  ApiProduces,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { ApiDocValidateUser } from './docs/validate.swagger.decorator';
import { User } from 'src/user/entities/user.entity';
import { validateUserDto } from './dto/validate.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PrivateService()
  @ApiDocValidateUser(User)
  @ApiBody({
    description: 'User login credentials',
    type: validateUserDto,
  })
  @Post('validate')
  validate(@Request() req) {
    const user = req.user as UserJWT;
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully logged in and received a JWT token',
    schema: {
      example: {
        token: 'your-jwt-token-here',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @ApiBody({
    description: 'User login credentials',
    type: LoginDto,
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async signIn(@Body() signInDto: LoginDto) {
    return this.authService.login({
      doc_number: +signInDto.doc_number,
      password: signInDto.password,
    });
  }
}
