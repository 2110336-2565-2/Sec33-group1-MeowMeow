import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsServiceImpl } from './posts.service';
import { PostsRepository } from './posts.repository';
@Module({
  controllers: [PostsController],
  providers: [
    {
      provide: 'PostsService',
      useClass: PostsServiceImpl,
    },
    PostsRepository,
  ],
})
export class PostsModule {}
