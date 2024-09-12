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
import { ApiConsumes, ApiOperation, ApiProduces, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PrivateService()
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  validate(@Request() req) {
    const user = req.user as UserJWT;
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login to obtain a JWT token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully logged in and received a JWT token',
    schema: {
      example: {
        access_token: 'your-jwt-token-here',
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
