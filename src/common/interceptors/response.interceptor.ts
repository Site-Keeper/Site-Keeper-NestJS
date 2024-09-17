import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Obtener la respuesta y el código de estado
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        // Determinar el mensaje basado en el código de estado
        const message = this.getMessageForStatusCode(statusCode);

        // Estructurar la respuesta
        return {
          statusCode,
          message,
          data,
        };
      })
    );
  }

  private getMessageForStatusCode(statusCode: number): string {
    switch (statusCode) {
      case 200:
      case 201:
        return 'Solicitud completada con éxito';
      case 400:
        return 'Error en la solicitud';
      case 401:
        return 'No autorizado';
      case 403:
        return 'Prohibido';
      case 404:
        return 'No encontrado';
      case 500:
        return 'Error interno del servidor';
      default:
        return 'Operación completada';
    }
  }
}
