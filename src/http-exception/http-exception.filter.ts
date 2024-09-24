import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Manejar el código de estado y los mensajes de error
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const errorDetails = this.getErrorDetails(exception);

    // Logging de la excepción
    // this.logger.error(
    //   {
    //     message: errorDetails.message,
    //     error: errorDetails.error,
    //     url: request.url,
    //     method: request.method,
    //     status: status,
    //   },
    //   exception instanceof Error ? exception.stack : undefined
    // );

    // Construcción de la respuesta de error
    const errorResponse = {
      statusCode: status,
      error: errorDetails.error,
      message: errorDetails.message,
      path: request.url,
    };

    // Envío de la respuesta de error
    response.status(status).json(errorResponse);
  }

  private getErrorDetails(exception: unknown): {
    error: string;
    message: string;
  } {
    if (exception instanceof BadRequestException) {
      return {
        error:
          (exception.getResponse() as any)['message'] || 'Invalid input data',
        message: 'Bad Request',
      };
    } else if (exception instanceof NotFoundException) {
      return {
        error:
          (exception.getResponse() as any)['message'] || 'Resource not found',
        message: 'Not Found',
      };
    } else if (exception instanceof UnauthorizedException) {
      const response = exception.getResponse();
      const customMessage =
        typeof response === 'string'
          ? response
          : response['message'] ||
            'Authentication is required to access this resource';

      return {
        error: customMessage,
        message: 'Unauthorized',
      };
    } else if (exception instanceof ForbiddenException) {
      return {
        error:
          (exception.getResponse() as any)['message'] ||
          'You do not have permission to access this resource',
        message: 'Forbidden',
      };
    } else if (exception instanceof HttpException) {
      return {
        error:
          (exception.getResponse() as any)['message'] || 'An error occurred',
        message: 'HTTP Error',
      };
    } else {
      console.log(exception);
      return {
        error: 'An unexpected error occurred',
        message: 'Internal Server Error',
      };
    }
  }
}
