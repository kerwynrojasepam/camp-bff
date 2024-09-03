import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { globalConfig } from './app.config.global';

async function bootstrap() {
  // FIXME: HOTFIX to be able to connect to magento api skipping this error: "ERROR [ExceptionsHandler] unable to verify the first certificate"
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  const port = globalConfig().port;
  const ecommercePlatform = globalConfig().ecommercePlatform;

  console.log('Ecommerce platform:', ecommercePlatform);

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
    cors: true,
    abortOnError: false,
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
}
bootstrap();
