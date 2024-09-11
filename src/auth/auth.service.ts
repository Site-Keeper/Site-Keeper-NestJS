import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async ValidateUser(doc_number: number, pass: string): Promise<any> {
    try {
      const user: User = await this.usersService.findOneByDocNumber(doc_number);

      console.log(user);

      if (!user) {
        throw new NotFoundException(
          'User not found, Verify your credentials or contact your administrator to register'
        );
      }
      if (user.is_deleted) {
        throw new NotFoundException();
      }
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      if (!user.name || !user.email) {
        throw new UnauthorizedException(
          'Please complete your account information to continue'
        );
      }
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(user: Partial<User>) {
    try {
      const verifiedUser = await this.ValidateUser(
        user.doc_number,
        user.password
      );

      const payload = {
        id: verifiedUser.id,
        doc_number: verifiedUser.doc_number,
        role: verifiedUser.role_id,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
