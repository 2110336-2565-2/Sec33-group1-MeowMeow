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
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  await prismaService.enableShutdownHooks(app);
  await app.listen(port);
}
bootstrap();
