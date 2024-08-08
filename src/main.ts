import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
    abortOnError: false,
  });
  app.setGlobalPrefix('api/v1');

  await app.listen(3003);
}
bootstrap();
