import {
  Injectable,
  NotFoundException,
  // UnauthorizedException,
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

  async validateUser(doc_number: number, pass: string): Promise<any> {
    try {
      const user: User = await this.usersService.findOneByDocNumber(doc_number);

      if (!user || user.is_deleted) {
        throw new NotFoundException(
          'User not found, Verify your credentials or contact your administrator to register'
        );
      }
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (!isMatch) {
        throw new NotFoundException(
          'User not found, Verify your credentials or contact your administrator to register'
        );
      }
      // if (!user.name || !user.email) {
      //   throw new UnauthorizedException(
      //     'Please complete your account information to continue'
      //   );
      // }
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(user: Partial<User>) {
    try {
      const verifiedUser = await this.validateUser(
        user.doc_number,
        user.password
      );

      const payload = {
        id: verifiedUser.id,
        doc_number: verifiedUser.doc_number,
        name: verifiedUser.name,
        email: verifiedUser.email,
        personnelType: verifiedUser.personnel_type,
        role: verifiedUser.role,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
