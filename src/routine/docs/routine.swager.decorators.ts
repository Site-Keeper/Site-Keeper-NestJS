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
      summary: '',
      description: '',
    }),
    ApiSuccessResponsesArray(Entity),
    ApiBadRequest()
  );
}

export function ApiDocGelByIdRoutine<T>(Entity: Type<T>) {
  return applyDecorators(
    ApiOperation({
      summary: '',
      description: '',
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
