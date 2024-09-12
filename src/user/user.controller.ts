import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {ApiTags} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ApiDocPostUser } from './docs/users.swager.decorators';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiDocPostUser(User)
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.userService.create(createUserDto, req.user.id);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findByID(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('doc/:doc_number')
  async findByDocNumber(@Param('doc_number') doc_number: string) {
    return this.userService.findOne(+doc_number);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body('role_id') role_id: string) {
    return this.userService.update({ role_id: +role_id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
