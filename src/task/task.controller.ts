import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { ApiDocGelAllTask, ApiDocGelByIdTask, ApiDocPostTask } from './docs/task.swager.decoratos';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiDocPostTask(Task)
  async create(@Body() createTaskDto: CreateTaskDto[]) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiDocGelAllTask(Task)
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiDocGelByIdTask(Task)
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the task to update',
    type: Number,
  })
  @ApiBody({
    description: 'Task update details',
    type: UpdateTaskDto,
    examples: {
      example1: {
        summary: 'Example of updating a task',
        value: {
          title: 'Complete project report',
          description: 'Revised description for the task.',
          state: 'COMPLETED',
          space_id: 1,
          object_id: 42,
          is_deleted: false,
          routine_id: 3,
          topic_id: 7,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Task successfully updated',
    type: Task,
    example: {
      example1: {
        summary: 'Example of a successful update response',
        value: {
          id: 1,
          title: 'Complete project report',
          description: 'Revised description for the task.',
          state: 'COMPLETED',
          space_id: 1,
          object_id: 42,
          is_deleted: false,
          routine_id: 3,
          topic_id: 7,
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    example: {
      example1: {
        summary: 'Example of a task not found response',
        value: {
          statusCode: 404,
          message: 'Task with ID 1 not found',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    example: {
      example1: {
        summary: 'Example of a bad request response',
        value: {
          statusCode: 400,
          message: 'Validation failed (string is expected)',
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: {
      example1: {
        summary: 'Example of an unauthorized response',
        value: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the task to delete',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Task successfully deleted',
    example: {
      example1: {
        summary: 'Example of a successful delete response',
        value: {
          message: 'Task successfully deleted',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    example: {
      example1: {
        summary: 'Example of a task not found response',
        value: {
          statusCode: 404,
          message: 'Task with ID 1 not found',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: {
      example1: {
        summary: 'Example of an unauthorized response',
        value: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    },
  })
  async remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
