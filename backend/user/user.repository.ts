import { mongoose } from '@typegoose/typegoose';
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
}
