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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PrivateService()
  @Permissions('can_create')
  @toTheEntity('users')
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.userService.create(createUserDto, req.user.id);
  }

  @PrivateService()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @PrivateService()
  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @PrivateService()
  @Get(':doc_number')
  findByDocNumber(@Param('doc_number') doc_number: string) {
    return this.userService.findOne(+doc_number);
  }

  @PrivateService()
  @Patch(':id')
  update(@Body('role_id') role_id: string) {
    return this.userService.update({ role_id: +role_id });
  }

  @PrivateService()
  @Permissions('can_delete')
  @toTheEntity('users')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
