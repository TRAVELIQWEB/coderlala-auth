import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
       dotenv.config();
   
   const app = await NestFactory.create(AppModule);


    app.use(cookieParser()); 
    app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  }),
);


   app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
await app.listen(process.env.PORT || 4000);
  

}
bootstrap();
