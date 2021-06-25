import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClipModule } from './clip.module';

async function bootstrap() {
  const app = await NestFactory.create(ClipModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(9065);
}
bootstrap();
