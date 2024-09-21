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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import {
  ApiDocGelAllTask,
  ApiDocGelByIdTask,
  ApiDocPatchTask,
  ApiDocPostTask,
} from './docs/task.swager.decoratos';
import {
  Permissions,
  PrivateService,
  toTheEntity,
} from 'src/common/decorators/permissions.decorator';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @PrivateService()
  @Permissions('can_create')
  @toTheEntity('tasks')
  @Post()
  @ApiDocPostTask(Task)
  async create(@Body() createTaskDto: CreateTaskDto[], @Request() req) {
    const user: UserJWT = req.user;
    const token: string = req.headers.authorization;
    return this.taskService.create(createTaskDto, user, token);
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('tasks')
  @Get()
  @ApiDocGelAllTask(Task)
  async findAll() {
    return this.taskService.findAll();
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('tasks')
  @Get(':id')
  @ApiDocGelByIdTask(Task)
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('tasks')
  @Get('ByRoutine/:routine_id')
  @ApiDocGelByIdTask(Task)
  async findByRoutine(@Param('routine_id') routine_id: number, @Request() req) {
    const token: string = req.headers.authorization;
    return this.taskService.findByRoutine(routine_id, token);
  }

  @PrivateService()
  @Permissions('can_update')
  @toTheEntity('tasks')
  @Patch(':id')
  @ApiDocPatchTask(Task)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req
  ) {
    const user: UserJWT = req.user;
    return this.taskService.update(+id, updateTaskDto, user);
  }

  @PrivateService()
  @Permissions('can_delete')
  @toTheEntity('tasks')
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const user: UserJWT = req.user;
    return this.taskService.remove(+id, user);
  }

  @PrivateService()
  @Permissions('can_update')
  @toTheEntity('tasks')
  @Patch('restore/:id')
  restore(@Param('id') id: string, @Request() req) {
    const user: UserJWT = req.user;
    return this.taskService.restore(+id, user);
  }
}
