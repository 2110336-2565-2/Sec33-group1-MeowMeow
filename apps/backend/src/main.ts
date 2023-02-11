import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { backendConfig as config } from 'config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  const port = config.port;
  app.useGlobalPipes(new ValidationPipe());
  if (config.swagger.enable) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API Document')
      .setDescription('API Document Description')
      .setVersion('1.0')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(config.swagger.prefixPath, app, swaggerDocument);
  }

  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  await prismaService.enableShutdownHooks(app);
  await app.listen(port);
}
bootstrap();
