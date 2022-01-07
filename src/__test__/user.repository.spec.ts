import UserModel, { User } from '../user/user.model';
import { UserRepository } from '../user/user.repository';
import { TestDatabase } from './util/TestDatabase';

describe('User Repostiory Test', () => {
  let db: TestDatabase;
  let repositoy: UserRepository;
  beforeAll(async () => {
    db = TestDatabase.getInstance();
    await db.connect();
    repositoy = new UserRepository();
  });
  afterEach(async () => {
    await db.clear();
  });
  afterAll(async () => {
    await db.close();
  });

  describe('create', () => {
    it('input에 슬랙 토큰이 없어도 저장된다.', async () => {
      const input = {
        email: 'aaa@naver.com',
        password: 'password',
      };
      const reuslt = await repositoy.create(input);
      expect(reuslt.email).toEqual(input.email);
    });

    it('input에 슬랙 토근이 있으면 같이 저장된다.', async () => {
      const input = {
        email: 'aaa@naver.com',
        password: 'password',
        slackToken: 'aaaa',
      };

      const result = await repositoy.create(input);

      expect(result.slackToken).toEqual(input.slackToken);
    });
  });

  describe('findById', () => {
    let user: User;
    beforeEach(async () => {
      user = await new UserModel({
        email: 'aaa@naver.com',
        password: 'password',
        slackToken: 'aaaa',
      }).save();
    });

    it('work', async () => {
      const findUser = await repositoy.findById(user._id);

      expect(findUser?._id).toEqual(user._id);
    });
  });
});
