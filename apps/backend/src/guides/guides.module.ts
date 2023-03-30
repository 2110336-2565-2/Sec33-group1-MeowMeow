import { Module } from '@nestjs/common';
import { PaymentModule } from 'src/payment/payment.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthServiceImpl } from '../auth/auth.service';
import { MediaModule } from '../media/media.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { UsersRepository } from '../users/users.repository';
import { GuidesController } from './guides.controller';
import { GuidesRepository } from './guides.repository';
import { GuidesServiceImpl } from './guides.service';

@Module({
  controllers: [GuidesController],
  providers: [
    {
      provide: 'GuidesService',
      useClass: GuidesServiceImpl,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    UsersRepository,
    GuidesRepository,
    PrismaService,
  ],
  imports: [ReviewsModule, MediaModule, PaymentModule],
})
export class GuidesModule {}
