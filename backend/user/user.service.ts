import { UserDto } from './user.dto';
import { User } from './user.model';
import { UserRepository } from './user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  create(input: UserDto): Promise<User> {
    return this.userRepository.create(input);
  }
}
