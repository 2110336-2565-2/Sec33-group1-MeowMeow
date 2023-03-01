import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService, PostsServiceImpl } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsServiceImpl],
})
export class PostsModule {}
