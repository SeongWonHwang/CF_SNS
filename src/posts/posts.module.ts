import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  //ioc 컨테이너에서 의존성 주입을 해줌.
  providers: [PostsService],
})
export class PostsModule {}
