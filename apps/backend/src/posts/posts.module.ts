import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsServiceImpl } from './posts.service';
import { PostsRepository } from './posts.repository';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GuidesRepository } from 'src/guides/guides.repository';
@Module({
  imports: [AuthModule],
  controllers: [PostsController],
  providers: [
    {
      provide: 'PostsService',
      useClass: PostsServiceImpl,
    },
    PostsRepository,
    GuidesRepository,
    PrismaService,
  ],
})
export class PostsModule {}
