import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BookingsRepository } from 'src/bookings/bookings.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/users/users.repository';
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
