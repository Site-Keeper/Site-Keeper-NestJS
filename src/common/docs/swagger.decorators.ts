import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseSwagerDto } from './api-response-dto-postive';
import { ApiErrorResponseSwaggerDto } from './api-response-dto-errors';
import { ApiErrorResponseUnauthorizeSwaggerDto } from './api-response-dto-error-unauthorize';

export function ApiCreateResponses<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(ApiResponseSwagerDto, entity),
    ApiOkResponse({
      status: HttpStatus.CREATED,
      description: `${entity.name} was created`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseSwagerDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(entity) },
            },
          },
        ],
        example: entity
      },
    })
  );
}

export function ApiSuccessResponses<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(ApiResponseSwagerDto),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: `Request Succesfull`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseSwagerDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(entity) },
            },
          },
        ],
      },
    })
  );
}

export function ApiSuccessResponsesArray<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(ApiResponseSwagerDto),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: `Request Successful`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseSwagerDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(entity) },
              },
            },
          },
        ],
      },
    })
  );
}

export function ApiBadRequest() {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseSwaggerDto),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request',
      schema: { $ref: getSchemaPath(ApiErrorResponseSwaggerDto) },
    })
  );
}
export function ApiUnauthorized() {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseUnauthorizeSwaggerDto),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
      schema: { $ref: getSchemaPath(ApiErrorResponseUnauthorizeSwaggerDto) },
    })
  );
}
