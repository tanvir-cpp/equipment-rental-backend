import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Global Validation Pipe - all incoming requests will be validated against DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,         
    }),
  );


  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
