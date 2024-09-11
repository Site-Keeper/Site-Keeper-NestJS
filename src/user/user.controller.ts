import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
