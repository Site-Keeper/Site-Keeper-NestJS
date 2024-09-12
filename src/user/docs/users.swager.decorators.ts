import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiCreateResponses,
} from 'src/common/docs/swagger.decorators';

export function ApiDocPostUser<T>(entity: Type<T>) {
  const description =
    'you can create users with the same role by sending an array with their ID numbers';
  return applyDecorators(
    ApiOperation({
      summary: 'create new user with an array',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}
