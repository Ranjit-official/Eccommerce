import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/exception/all-exception.filter';
import * as express from 'express';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(express.urlencoded({ extended: true }));
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
