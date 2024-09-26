import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Permissions,
  PrivateService,
  Role,
  toTheEntity,
} from 'src/common/decorators/permissions.decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import {
  ApiDocDeleteUser,
  ApiDocGetAllUser,
  ApiDocGetStatisticsUser,
  ApiDocGetUserById,
  ApiDocPatchUser,
  ApiDocPostUser,
} from './docs/users.swager.decorators';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @PrivateService()
  @Permissions('can_create')
  @toTheEntity('users')
  @Role(['admin'])
  @ApiDocPostUser(User)
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.userService.create(createUserDto, req.user.id);
  }

  @PrivateService()
  @Role(['admin'])
  @Permissions('can_read')
  @toTheEntity('users')
  @Get()
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiDocGetAllUser(User)
  async findAll(@Query('type') type?: string, @Query('role') role?: string) {
    return this.userService.findAll(type, +role);
  }

  @PrivateService()
  @Role(['admin'])
  @Permissions('can_read')
  @toTheEntity('users')
  @Get('statistics')
  @ApiDocGetStatisticsUser(User)
  async findStatisticsUser() {
    return this.userService.userStatistics();
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('users')
  @Get(':id')
  @ApiDocGetUserById(User)
  async findByID(@Param('id') id: string, @Request() req) {
    const user = req.user as UserJWT;
    return this.userService.findOne(+id, user);
  }

  @PrivateService()
  @Get('docnumber/:doc_number')
  findByDocNumber(@Param('doc_number') doc_number: string) {
    return this.userService.findOneByDocNumber(+doc_number);
  }

  @PrivateService()
  @Permissions('can_update')
  @toTheEntity('users')
  @Patch(':id')
  @ApiDocPatchUser(User)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ) {
    const user = req.user as UserJWT;
    return this.userService.update(+id, updateUserDto, user);
  }

  @PrivateService()
  @Permissions('can_delete')
  @toTheEntity('users')
  @Delete(':id')
  @ApiDocDeleteUser(User)
  async remove(@Param('id') id: string, @Request() req) {
    const user = req.user as UserJWT;
    const token: string = req.headers.authorization;
    return this.userService.remove(+id, user, token);
  }
}
