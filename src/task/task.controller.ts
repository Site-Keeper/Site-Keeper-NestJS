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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({
    description: 'Task creation details',
    type: CreateTaskDto,
    examples: {
      example1: {
        summary: 'Example of creating a task',
        value: {
          title: 'Complete project report',
          description: 'Prepare the final report for the project and submit it by the end of the week.',
          state: 'PENDING',
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
    status: 201,
    description: 'Task successfully created',
    type: Task,
    example: {
      example1: {
        summary: 'Example of a successful task creation response',
        value: {
          id: 1,
          title: 'Complete project report',
          description: 'Prepare the final report for the project and submit it by the end of the week.',
          state: 'PENDING',
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
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks',
    type: [Task],
    example: {
      example1: {
        summary: 'Example of a successful response with a list of tasks',
        value: [
          {
            id: 1,
            title: 'Complete project report',
            description: 'Prepare the final report for the project and submit it by the end of the week.',
            state: 'PENDING',
            space_id: 1,
            object_id: 42,
            is_deleted: false,
            routine_id: 3,
            topic_id: 7,
          },
          {
            id: 2,
            title: 'Update website',
            description: 'Implement new features and bug fixes on the company website.',
            state: 'IN_PROGRESS',
            space_id: 2,
            object_id: null,
            is_deleted: false,
            routine_id: 5,
            topic_id: 8,
          },
        ],
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
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the task to retrieve',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Task found',
    type: Task,
    example: {
      example1: {
        summary: 'Example of a successful response for a task retrieval',
        value: {
          id: 1,
          title: 'Complete project report',
          description: 'Prepare the final report for the project and submit it by the end of the week.',
          state: 'PENDING',
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
