import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

describe('UserService Test', () => {
  let service: UserService;
  let repository: UserRepository;
  beforeAll(async () => {
    repository = new UserRepository();
    repository.create = jest.fn();
    service = new UserService(repository);
  });

  describe('create 할때', () => {
    it('userRepository의 create가 한번 불린다.', async () => {
      const input = {
        email: 'aaa@naver.com',
        password: 'password',
      };
      await service.create(input);

      expect(repository.create).toBeCalledTimes(1);
    });
  });
});
