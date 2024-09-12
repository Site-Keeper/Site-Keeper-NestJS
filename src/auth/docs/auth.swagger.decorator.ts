import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiCreateResponses,
} from 'src/common/docs/swagger.decorators';

export function ApiDocLogin<T>(entity: Type<T>) {
  const description =
    'You can use this endpoint to login a user and receive a JWTtoken';
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}
