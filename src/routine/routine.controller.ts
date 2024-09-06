import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post()
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routineService.create(createRoutineDto);
  }

  @Get()
  findAll() {
    return this.routineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
    return this.routineService.update(+id, updateRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routineService.remove(+id);
  }
}
