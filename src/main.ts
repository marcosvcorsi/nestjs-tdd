import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Videos')
    .setDescription('The Videos API')
    .setVersion('1.0')
    .addTag('videos')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
    
  await app.listen(3333);
}
bootstrap();
