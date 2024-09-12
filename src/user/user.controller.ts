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

@toTheEntity('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PrivateService()
  @Permissions('can_create')
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.userService.create(createUserDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get(':doc_number')
  findByDocNumber(@Param('doc_number') doc_number: string) {
    return this.userService.findOne(+doc_number);
  }

  @Patch(':id')
  update(@Body('role_id') role_id: string) {
    return this.userService.update({ role_id: +role_id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
