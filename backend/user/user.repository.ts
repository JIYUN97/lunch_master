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

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });
    return user ?? undefined;
  }
}
