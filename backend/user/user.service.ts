import { logger } from '@typegoose/typegoose/lib/logSettings';
import { FilterQuery } from 'mongoose';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import jwt from 'jsonwebtoken';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  create(input: UserDto): Promise<User> {
    return this.userRepository.create(input);
  }

  // FilterQuery 이게 되는건가여...ㅠ 진짜 필터쿼리...
  login(
    email: FilterQuery<UserDto['email']>,
  ): Promise<{ token: string; user: UserDto }> {
    const user = this.userRepository.findOne(email);
    if (!user) throw logger.warn(user, '존재하지 않는 유저입니다.');
    //TODO : jwt로 바꾸기
    const token = jwt.sign(
      { email: user.email },
      process.env.TOKEN_KEY || 'random',
    );
    return { token, user };
  }
}
