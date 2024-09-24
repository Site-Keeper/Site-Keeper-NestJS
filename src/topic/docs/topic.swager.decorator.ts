import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiSuccessResponses,
  ApiSuccessResponsesArray,
} from 'src/common/docs/swagger.decorators';

export function ApiDocGelAllTopic<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: '',
      description: '',
    }),
    ApiSuccessResponsesArray(Entity),
    ApiBadRequest()
  );
}

export function ApiDocGelByIdTopic<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: '',
      description: '',
    }),
    ApiSuccessResponses(Entity),
    ApiBadRequest()
  );
}
