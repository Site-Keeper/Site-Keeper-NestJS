import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create() {
    return this.taskService.create();
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.taskService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
