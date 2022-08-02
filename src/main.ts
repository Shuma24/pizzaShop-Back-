import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootsTrap = async () => {
  const pizzaApi = await NestFactory.create(AppModule);
  pizzaApi.setGlobalPrefix('api');
  pizzaApi.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  pizzaApi.enableCors();
  const port = process.env.PORT || 3000;
  pizzaApi.listen(port);
};

bootsTrap();
