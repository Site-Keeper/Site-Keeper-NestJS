import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiCreateResponses,
  ApiSuccessResponses,
  ApiSuccessResponsesArray,
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

export function ApiDocGetAllUser<T>(entity: Type<T>) {
  const description = 'you can get all users';
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users',
      description,
    }),
    ApiSuccessResponsesArray(entity),
    ApiBadRequest()
  );
}

export function ApiDocGetStatisticsUser<T>(entity: Type<T>) {
  const description = 'you can get statistics';
  return applyDecorators(
    ApiOperation({
      summary: 'Get statistics',
      description,
    }),
    ApiSuccessResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocGetUserById<T>(entity: Type<T>) {
  const description = 'you can get user by ID';
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by ID',
      description,
    }),
    ApiSuccessResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocPatchUser<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user details',
      description:
        'you can update user details by sending an object with the new details',
    }),
    ApiSuccessResponses(Entity),
    ApiBadRequest()
  );
}

export function ApiDocDeleteUser<T>(entity: Type<T>) {
  const description =
    'you can delete user by sending an object with the user ID number';
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}
