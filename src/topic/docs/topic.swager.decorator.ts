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
      summary: 'Get all topics',
      description: 'Retrieve a list of all topics from the database.',
    }),
    ApiSuccessResponsesArray(Entity),
    ApiBadRequest()
  );
}

export function ApiDocGelByIdTopic<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get topic by ID',
      description: 'Retrieve a specific topic from the database by its ID.',
    }),
    ApiSuccessResponses(Entity),
    ApiBadRequest()
  );
}
