import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentModule } from '../payment/payment.module';
import { PrismaService } from '../prisma/prisma.service';
import { MediaModule } from '../media/media.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { UsersRepository } from '../users/users.repository';
import { GuidesController } from './guides.controller';
import { GuidesRepository } from './guides.repository';
import { GuidesServiceImpl } from './guides.service';

@Module({
  imports: [AuthModule, ReviewsModule, MediaModule, PaymentModule],
  controllers: [GuidesController],
  providers: [
    {
      provide: 'GuidesService',
      useClass: GuidesServiceImpl,
    },
    GuidesRepository,
    UsersRepository,
    PrismaService,
  ],
  exports: ['GuidesService'],
})
export class GuidesModule {}
