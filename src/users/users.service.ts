import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async createUser(user: Pick<UsersModel, 'email' | 'nickName' | 'password'>) {
    // 1) nickName 중복이 없는지 확인
    // exist() -> 만약에 조건에 해당되는 값이 있으면 true 반환
    const nickNameExists = await this.usersRepository.exists({
      where: {
        nickName: user.nickName,
      },
    });

    if (nickNameExists) {
      throw new BadRequestException('이미 존재하는 nickName 입니다.');
    }

    const emailExist = await this.usersRepository.exists({
      where: {
        email: user.email,
      },
    });

    if (emailExist) {
      throw new BadRequestException('이미 가입한 email 입니다.');
    }

    const userObject = this.usersRepository.create({
      nickName: user.nickName,
      email: user.email,
      password: user.password,
    });

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
}
