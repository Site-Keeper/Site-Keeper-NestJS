import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Permissions,
  PrivateService,
  Role,
  toTheEntity,
} from 'src/common/decorators/permissions.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ApiDocPostUser } from './docs/users.swager.decorators';
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
  async findAll() {
    return this.userService.findAll();
  }

  @PrivateService()
  @Role(['admin'])
  @Permissions('can_read')
  @toTheEntity('users')
  @Get("statistics")
  async findStatisticsUser() {
    return this.userService.userStatistics();
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('users')
  @Get(':id')
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
  async remove(@Param('id') id: string, @Request() req) {
    const user = req.user as UserJWT;
    const token: string = req.headers.authorization;
    return this.userService.remove(+id, user, token);
  }
}
