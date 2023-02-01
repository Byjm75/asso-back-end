import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.setGlobalPrefix('/api');
//   app.enableCors({
//     origin: '*',
//     methods: 'GET, PUT, POST,PATCH, DELETE',
//     allowedHeaders: 'Content-Type, Authorization',
//   });
//   await app.listen(process.env.PORT);
// }
// bootstrap();
