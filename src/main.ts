import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // filtro de excepciones
  app.useGlobalFilters(new HttpExceptionFilter());

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    })
  );

  const corsOptions: CorsOptions = {
    origin: 'http://your-frontend-domain.com', // Cambia esto por el dominio de tu front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, // Cambia esto si necesitas habilitar cookies o credenciales
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('SiteKeeper')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
