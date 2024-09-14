import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status;
    let error;
    let message;

    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      error = 'Bad Request';
      message = 'Invalid input data';
    } else if (exception instanceof NotFoundException) {
      status = exception.getStatus();
      error = 'Not Found';
      message = 'Resource not found';
    } else if (exception instanceof UnauthorizedException) {
      status = exception.getStatus();
      error = 'Unauthorized';
      message = 'Authentication is required';
    } else if (exception instanceof ForbiddenException) {
      status = exception.getStatus();
      error = 'Forbidden';
      message = 'You do not have permission to access this resource';
    } else if (exception instanceof HttpException) {
      // Otras excepciones HTTP no especificadas anteriormente
      status = exception.getStatus();
      error = exception.message || 'Error';
      message = 'An error occurred';
    } else {
      // Excepciones no controladas
      status = 500;
      error = 'Internal Server Error';
      message = 'An unexpected error occurred';
    }

    // Construir la respuesta de error sin el campo "timestamp"
    const errorResponse = {
      statusCode: status,
      error: error,
      message: message,
      path: request.url,
    };

    // Enviar la respuesta
    response.status(status).json(errorResponse);
  }
}
