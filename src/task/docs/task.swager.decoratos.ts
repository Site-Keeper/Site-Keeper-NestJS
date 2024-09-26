import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiCreateResponses,
  ApiSuccessResponses,
  ApiSuccessResponsesArray,
} from 'src/common/docs/swagger.decorators';
import { CreateTaskDto } from '../dto/create-task.dto';

export function ApiDocPostTask<T>(entity: Type<T>) {
  const description = 'You can create a new task by providing task details such as name, description, and other necessary fields.';
  return applyDecorators(
    ApiOperation({
      summary: 'Create new task',
      description,
    }),
    ApiBody({
      type: [CreateTaskDto],
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocGelAllTask<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all tasks',
      description: 'Retrieve a list of all tasks in the system.',
    }),
    ApiSuccessResponsesArray(Entity),
    ApiBadRequest()
  );
}

export function ApiDocGelByIdTask<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get task by ID',
      description: 'Retrieve a specific task by its ID from the system.',
    }),
    ApiSuccessResponses(Entity),
    ApiBadRequest()
  );
}

export function ApiDocGetStatisticsTask<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get statistics',
      description: 'Retrieve statistics about tasks in the system.',
    }),
    ApiSuccessResponses(Entity),
    ApiBadRequest()
  );
}

export function ApiDocPatchTask<T>(entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Update task details',
      description: 'You can update the details of an existing task by providing the necessary fields.',
    }),
    ApiBody({
      type: CreateTaskDto,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocDeleteTask<T>(entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete task',
      description: 'You can delete an existing task by its ID from the system.',
    }),
    ApiSuccessResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocPatchRetoreTask<T>(entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Restore task',
      description: 'You can restore an existing task by its ID from the system.',
    }),
    ApiSuccessResponses(entity),
    ApiBadRequest()
  );
}
