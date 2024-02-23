/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entitiy';

@Module({
  imports:[
    //forFeature 레포지토리 주입할떄 사용
    TypeOrmModule.forFeature([
      PostsModel,
    ]),
  ],
  controllers: [PostsController],
  //ioc 컨테이너에서 의존성 주입을 해줌.
  providers: [PostsService],
})
export class PostsModule {}
