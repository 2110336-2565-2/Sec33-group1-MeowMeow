import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/users/users.repository';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';

@Module({
  imports: [HttpModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    UsersRepository,
    PrismaService,
    PaymentRepository,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
