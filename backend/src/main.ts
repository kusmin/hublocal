import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  dotenv.config();

  const options = new DocumentBuilder()
    .setTitle('API hub')
    .setDescription('API para teste no hublocal')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('empresa')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(5000);
}
bootstrap();
