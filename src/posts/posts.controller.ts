/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts : PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 1000000,
    commentCount: 99999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 혜린',
    content: '노래 연습 하고 있는 혜린',
    likeCount: 1000000,
    commentCount: 99999,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 로제 ',
    content: '종합운동장에서 공연중인 로제',
    likeCount: 1000000,
    commentCount: 99999,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 post를 다 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // 2) GET /posts/:id
  //    id에 해당되는 post를 가져온다
  //    예를 들어서 id=1일 경우 id가 1인 포스트를 가져온다.

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  //    POST를 생성한다.

  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
    ) {
      return this.postsService.createPost(author, title, content);
    }
  
  // 4) PUT /posts/:id
  //    id에 해당되는 POST를 변경한다.

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(+id, author, title, content);
  }
  
  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.

  @Delete(':id')
  deletePosts(
    @Param('id') id: string,
  ){
    return this.postsService.deletePost(+id);
  }
}
