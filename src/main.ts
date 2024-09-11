import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     disableErrorMessages: true
  //     // whitelist: truepreguntarle a milton sobre este error
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
