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
  toTheEntity,
} from 'src/common/decorators/permissions.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ApiDocPostUser } from './docs/users.swager.decorators';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @PrivateService()
  @Permissions('can_create')
  @toTheEntity('users')
  @ApiDocPostUser(User)
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.userService.create(createUserDto, req.user.id);
  }

  @PrivateService()
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @PrivateService()
  @Get(':id')
  async findByID(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @PrivateService()
  @Get(':doc_number')
  findByDocNumber(@Param('doc_number') doc_number: string) {
    return this.userService.findOne(+doc_number);
  }

  @PrivateService()
  @Patch(':id')
  async update(@Param('id') id: string, @Body('role_id') role_id: string) {
    return this.userService.update({ role_id: +role_id });
  }

  @PrivateService()
  @Permissions('can_delete')
  @toTheEntity('users')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
