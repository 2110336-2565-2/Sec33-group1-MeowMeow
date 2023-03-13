import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsServiceImpl } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [
    {
      provide: 'PostsService',
      useClass: PostsServiceImpl,
    },
  ],
})
export class PostsModule {}
