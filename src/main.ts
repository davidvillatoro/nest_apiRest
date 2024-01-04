import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api') //metodo para prefijos de los endpoints

  //configuracion global de los pipes para  los DTO
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // configuaraciones para resivier los query parametros de string a number
    transform: true,
    transformOptions:{
      enableImplicitConversion: true
    }
    })
   );

  await app.listen(3005);
}
bootstrap();
