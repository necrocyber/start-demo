import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar la validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina los campos que no están definidos en el DTO
      forbidNonWhitelisted: true, // Lanza un error si hay campos no permitidos
      transform: true, // Convierte automáticamente los parámetros a los tipos definidos en el DTO
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('User API') // Título del documento
    .setDescription('The User API description') // Descripción de la API
    .setVersion('1.0') // Versión de la API
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
