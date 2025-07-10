import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita o uso de pipes de validação globalmente
  const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription(
      'Documentação da API de usuários com NestJS + Prisma + Swagger',
    )
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth({// Esquema 
      type: 'http',
      scheme: 'bearer', // Define o tipo de autenticação como Bearer Token
      bearerFormat: 'JWT', // Formato do token JWT 
      name: 'Authorization', // Nome do cabeçalho de autenticação
      in: 'header', // Localização do cabeçalho de autenticação
      description: 'Insira o token JWT no formato "Bearer {token}"', 
    }) // Tag opcional para categorizar as rotas
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Acessível em http://localhost:3000/api

  app.useGlobalPipes(
    // Configurações da documentação Swagger
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Lança erro se propriedades não definidas forem enviadas
      transform: true, // Transforma os dados recebidos em instâncias dos DTOs
    }),
  );
  await app.listen(3000);
}
bootstrap();
