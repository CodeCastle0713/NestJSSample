import { ValidationError } from 'class-validator';

import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error: ValidationError) => ({
          field: error.property,
          message: Object.values(error.constraints || {}),
        }));

        formattedErrors.forEach((error) => {
          throw new UnprocessableEntityException({ message: error.message[0] });
        });
      },
    })
  );
  const PORT = configService.get('port');
  await app.listen(PORT);
}
bootstrap();
