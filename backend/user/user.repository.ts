import { mongoose } from '@typegoose/typegoose';
import { logger } from '@typegoose/typegoose/lib/logSettings';
import { FilterQuery } from 'mongoose';
import { UserDto } from './user.dto';
import UserModel, { User } from './user.model';

export class UserRepository {
  private readonly repository;
  constructor() {
    this.repository = UserModel;
  }

  async create(input: UserDto): Promise<User> {
    return this.repository.create(input);
  }

  async findById(
    id: number | mongoose.Types.ObjectId,
  ): Promise<User | undefined> {
    const user = await this.repository.findById(id);
    return user ?? undefined;
  }

  // 질문 : FilterQuery타입은 왜 적용이 안될까요..?왤까..
  async findOne(
    email: FilterQuery<UserDto['email']>,
  ): Promise<{ user: UserDto }> {
    const user = await this.repository.findOne(email);
    return user;
  }
}
