import { Type, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import {
  ApiBadRequest,
  ApiCreateResponses,
  ApiSuccessResponses,
  ApiSuccessResponsesArray,
} from 'src/common/docs/swagger.decorators';
import { UpdateRoutineDto } from '../dto/update-routine.dto';

export function ApiDocPostRoutine<T>(entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'create new Routine ',
      description: 'you can create Routine',
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocGelAllRoutine<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: ' Get all Routines ',
      description: 'you can Get all Routines',
    }),
    ApiSuccessResponsesArray(Entity),
    ApiBadRequest()
  );
}

export function ApiDocGetRoutineToday<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Routine Today ',
      description: 'you can Get Routine Today',
    }),
    ApiSuccessResponses(Entity),
    ApiBadRequest()
  );
}

export function ApiDocGetRoutineByUserId<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Routine by UserId ',
      description: 'you can Get Routine by UserId',
    }),
    ApiSuccessResponsesArray(Entity),
    ApiBadRequest()
  );
}

export function ApiDocGelByIdRoutine<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Routine by ID ',
      description: 'you can Get Routine by ID',
    }),
    ApiSuccessResponses(Entity),
    ApiBadRequest()
  );
}

export function ApiDocPatchRoutine<T>(entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'create new Routine ',
      description: 'you can create Routine',
    }),
    ApiBody({
      type: UpdateRoutineDto,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocDeleteRoutine<T>(entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete Routine ',
      description: 'you can Delete Routine',
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocPatchRestoreRoutine<T>(entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: 'Restore Routine ',
      description: 'you can Restore Routine',
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}
