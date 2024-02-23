import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entitiy';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

// let posts: PostModel[] = [
//   {
//     id: 1,
//     author: 'newjeans_official',
//     title: '뉴진스 민지',
//     content: '메이크업 고치고 있는 민지',
//     likeCount: 1000000,
//     commentCount: 99999,
//   },
//   {
//     id: 2,
//     author: 'newjeans_official',
//     title: '뉴진스 혜린',
//     content: '노래 연습 하고 있는 혜린',
//     likeCount: 1000000,
//     commentCount: 99999,
//   },
//   {
//     id: 3,
//     author: 'blackpink_official',
//     title: '블랙핑크 로제 ',
//     content: '종합운동장에서 공연중인 로제',
//     likeCount: 1000000,
//     commentCount: 99999,
//   },
// ];

@Injectable()
export class PostsService {
  constructor(
    //레포지토리 주입
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      relations: ['author'],
      where: {
        //id만 써도됨
        id: id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다.
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)
    // 객체생성은 비동기가 아닌 동기로 이루어짐

    //create
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      title: title,
      content: content,
      likeCount: 0,
      commentCount: 0,
    });

    //save
    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(postId: number, title: string, content: string) {
    // save의 기눙
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.

    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  //   deletePost(postId: number) {
  //     const post = posts.find((post) => post.id === postId);

  //     if (!post) {
  //       throw new NotFoundException();
  //     }
  //     //삭제와 같음
  //     posts = posts.filter((post) => post.id !== postId);

  //     return postId;
  //   }
  // }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
