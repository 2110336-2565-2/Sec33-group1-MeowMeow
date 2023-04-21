import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BookingsRepository } from '../bookings/bookings.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from '../users/users.repository';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    UsersRepository,
    PrismaService,
    PaymentRepository,
    BookingsRepository,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
