import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiCreateResponses,
} from 'src/common/docs/swagger.decorators';

export function ApiDocPostRoutine<T>(entity: Type<T>) {
  const description = 'you can create Routine';
  return applyDecorators(
    ApiOperation({
      summary: 'create new Routine ',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}
