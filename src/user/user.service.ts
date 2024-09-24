import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/entities/role.entity';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { RoutineService } from 'src/routine/routine.service';
import { Routine } from 'src/routine/entities/routine.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private routineService: RoutineService
  ) {}

  async create(createUserDto: CreateUserDto, userID: number) {
    try {
      const role = await this.roleRepository.findOneBy({
        id: createUserDto.role_id,
      });

      if (!role) {
        throw new BadRequestException('El rol especificado no existe.');
      }

      const usersResponse: Partial<User>[] = [];

      for (const docNumber of createUserDto.doc_numbers) {
        const existingUser = await this.userRepository.findOneBy({
          doc_number: docNumber,
        });

        if (existingUser) {
          if (existingUser.is_deleted) {
            existingUser.is_deleted = false;
            existingUser.updated_by = userID;
            existingUser.role = role;
            await this.userRepository.save(existingUser);

            delete existingUser.password;
            delete existingUser.updated_at;
            delete existingUser.updated_by;
            delete existingUser.role.permissions;

            usersResponse.push(existingUser);
          } else {
            throw new BadRequestException(
              `El usuario con número de documento ${docNumber} ya existe y no está eliminado.`
            );
          }
        } else {
          const newUser: Partial<User> = {
            doc_number: docNumber,
            password: bcrypt.hashSync(docNumber.toString(), 10),
            role: role,
            personnel_type: createUserDto.personnel_type || null,
            created_by: userID,
            updated_by: userID,
          };

          const savedUser = await this.userRepository.save(newUser);

          delete savedUser.password;
          delete savedUser.updated_at;
          delete savedUser.updated_by;
          delete savedUser.role.permissions;

          usersResponse.push(savedUser);
        }
      }

      return usersResponse;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new InternalServerErrorException(
        'Error al crear o actualizar usuarios.'
      );
    }
  }

  async findAll() {
    const users: User[] = await this.userRepository.find({
      relations: ['role'],
      order: {
        id: 'ASC',
      },
    });

    return users.filter((user) => {
      if (!user.is_deleted) {
        delete user.password;
        delete user.updated_at;
        delete user.updated_by;
        delete user.role.permissions;
        delete user.created_at;
        delete user.created_by;
        return user;
      }
    });
  }

  async findOne(id: number, userJWT: UserJWT) {
    if (this.verifyUserIdentity(id, userJWT)) {
      const user = await this.userRepository.findOneBy({ id });
      delete user.password;
      return user;
    }
  }

  async findOneByDocNumber(doc_number: number) {
    if (!Number.isNaN(doc_number)) {
      const user: User = await this.userRepository.findOne({
        where: { doc_number },
        relations: ['role'],
      });

      if (user != null) {
        return user;
      }
      throw new NotFoundException(
        'No existe un usuario con el numero de documento ' + doc_number
      );
    } else {
      throw new BadRequestException(
        `El documento de identificacion debe ser un numero`
      );
    }
  }

  async userStatistics() {
    try {
      const users: User[] = await this.userRepository.find({
        relations: ['role'],
      });
      const usersAdmin = users.filter((user) => user.role.name === 'admin');
      const usersPerssonel = users.filter(
        (user) => user.role.name === 'perssonel'
      );
      const usersEmployed = users.filter(
        (user) => user.role.name === 'employed'
      );

      return {
        total: users.length,
        admin: usersAdmin.length,
        perssonel: usersPerssonel.length,
        employed: usersEmployed.length,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear o actualizar usuarios.'
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, userJWT: UserJWT) {
    if (!Number.isNaN(id)) {
      if (this.verifyUserIdentity(id, userJWT)) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
          throw new NotFoundException('No existe un usuario con el id ' + id);
        }

        if (userJWT.role.name !== 'admin') {
          const allowedFields = ['name', 'email'];

          Object.keys(updateUserDto).forEach((key) => {
            if (!allowedFields.includes(key)) {
              delete updateUserDto[key];
            }
          });
        }
        await this.userRepository.update(id, {
          ...updateUserDto,
          updated_by: userJWT.id,
        });
        const uptadedUser: User = await this.userRepository.findOneBy({ id });
        delete uptadedUser.password;
        return uptadedUser;
      }
      throw new UnauthorizedException(
        'El usuario no puede cambiar otros usarios distintos a el'
      );
    } else {
      throw new BadRequestException(`El id ser un numero`);
    }
  }

  async remove(id: number, userJWT: UserJWT, token: string) {
    if (!Number.isNaN(id)) {
      if (this.verifyUserIdentity(id, userJWT)) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user || user.is_deleted) {
          throw new NotFoundException(
            'No existe o ya fue eliminado el usuario con el id ' + id
          );
        }

        const routines: Routine[] = await this.routineService.findByUser(id);

        if (routines.length > 0) {
          routines.forEach((routine) => {
            this.routineService.remove(routine.id, userJWT, token);
          });
        }

        await this.userRepository.update(id, {
          is_deleted: true,
          updated_by: userJWT.id,
        });
        const deletedUser: User = await this.userRepository.findOneBy({ id });
        delete deletedUser.password;
        return deletedUser;
      }
      throw new UnauthorizedException(
        'El usuario no puede cambiar otros usarios distintos a el'
      );
    } else {
      throw new BadRequestException(`El id ser un numero`);
    }
  }

  verifyUserIdentity(userID: number, user: UserJWT) {
    if (user.role.name === 'admin') {
      return true;
    } else {
      if (user.id === userID) {
        return true;
      }
      throw new UnauthorizedException();
    }
  }
}
