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
  const description = 'you can create task ';
  return applyDecorators(
    ApiOperation({
      summary: 'create new task',
      description,
    }),
    ApiBody({
      type: [CreateTaskDto]
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocGelAllTask<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: '',
      description: ''
    }),
    ApiSuccessResponsesArray(Entity),
    ApiBadRequest()
  )
}


export function ApiDocGelByIdTask<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: '',
      description: ''
    }),
    ApiSuccessResponses(Entity),
    ApiBadRequest()
  )
}
