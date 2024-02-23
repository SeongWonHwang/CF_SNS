/**
 * id: number
 *
 * nickname: stirng
 *
 * email: string
 *
 * password: string
 *
 * role: [Roles.Enum.USER, RolesEnum.ADMIN]
 */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entitiy';

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    //1)
    length: 20,
    //2)
    unique: true,
  })
  // 1) 길이가 20을 넘지 않을 것
  // 2) 유일무이한 값이 될 것
  nickName: string;

  @Column({
    unique: true,
  })
  // 1) 유일무이한 값이 될 것
  email: string;

  @Column()
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];
}
