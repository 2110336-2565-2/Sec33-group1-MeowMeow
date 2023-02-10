import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthServiceMock } from './auth.service.mock';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceMock,
    },
    PrismaService,
  ],
})
export class AuthModule {}
