import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto, userID: number) {
    const users: Partial<User>[] = createUserDto.doc_numbers.map(
      (docNumber) => ({
        doc_number: docNumber,
        password: bcrypt.hashSync(docNumber.toString(), 10),
        role_id: createUserDto.role_id,
        perssonel_type: createUserDto.perssonel_type || null,
        created_by: userID,
        updated_by: userID,
      })
    );

    try {
      await Promise.all(users.map((user) => this.userRepository.save(user)));
      return {
        message: 'users were created correctly',
        data: users,
      };
    } catch (error) {
      console.error('Error when creating users:', error);

      return {
        message: 'An error occurred when creating users',
        error,
      };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByDocNumber(doc_number: number) {
    try {
      const user = this.userRepository.findOneBy({ doc_number });
      return user;
    } catch (error) {
      throw error;
    }
  }

  update(updateUserDto: UpdateUserDto) {
    return `This action updates a #${updateUserDto.role_id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
