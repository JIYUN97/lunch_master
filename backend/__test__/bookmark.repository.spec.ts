import { MongoMemoryServer } from 'mongodb-memory-server';
import BookmarkModel, { Bookmark } from '../bookmark/bookmark.model';
import UserModel, { User } from '../user/user.model';
import { BookmarkRepository } from '../bookmark/bookmark.repository';
import { TestDatabaseClient } from './util/TestDatabaseClient';

describe('Bookmark Repository test', () => {
  let db: MongoMemoryServer;
  let connection: TestDatabaseClient;
  let repository: BookmarkRepository;
  let user: User;

  beforeAll(async () => {
    db = new MongoMemoryServer();
    await db.start();

    connection = new TestDatabaseClient(db.getUri());
    await connection.connect();
    repository = new BookmarkRepository();

    user = await new UserModel({
      email: 'aaa@naver.com',
      password: 'password',
    }).save();
  });

  afterEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
    await db.stop();
  });

  describe('create', () => {
    it('북마크 정보는 링크가 없어도 저장된다', async () => {
      const input = {
        user: user._id,
        title: '나성타코',
        address: '서울특별시 마포구 서교동 367-1 2층',
        roadAddress: '서울특별시 마포구 잔다리로2길 24 2층',
        category: '음식점>멕시코,남미음식',
      };
      const result = await repository.create(input);
      expect(result.title).toEqual(input.title);
    });
  });
});
