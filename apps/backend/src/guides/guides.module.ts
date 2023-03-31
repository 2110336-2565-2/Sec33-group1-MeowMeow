import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GuidesController } from './guides.controller';
import { GuidesServiceImpl } from './guides.service';
import { GuidesRepository } from './guides.repository';
import { AuthServiceImpl } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { ReviewsModule } from '../reviews/reviews.module';
import { MediaModule } from '../media/media.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, ReviewsModule, MediaModule],
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
