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
    origin: 'https://site-keeper-react.vercel.app', // Cambia esto por el dominio de tu front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita el uso de cookies o credenciales
  };

  const allowedOrigins = [
    'http://localhost:5173',
    'https://musical-lolly-355227.netlify.app',
    'https://site-keeper-react.vercel.app',
  ];

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });

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
