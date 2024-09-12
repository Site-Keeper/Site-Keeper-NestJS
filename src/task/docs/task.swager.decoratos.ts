import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiCreateResponses,
} from 'src/common/docs/swagger.decorators';

export function ApiDocPostTask<T>(entity: Type<T>) {
  const description = 'you can create task ';
  return applyDecorators(
    ApiOperation({
      summary: 'create new task',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}
