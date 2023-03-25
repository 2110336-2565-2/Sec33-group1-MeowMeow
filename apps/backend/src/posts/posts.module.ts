import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsServiceImpl } from './posts.service';
import { PostsRepository } from './posts.repository';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [PostsController],
  providers: [
    {
      provide: 'PostsService',
      useClass: PostsServiceImpl,
    },
    PostsRepository,
    PrismaService,
  ],
})
export class PostsModule {}
