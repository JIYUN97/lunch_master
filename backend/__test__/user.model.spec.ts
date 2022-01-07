import { MongoMemoryServer } from 'mongodb-memory-server';
import UserModel, { User } from '../user/user.model';
import { TestDatabaseClient } from './util/TestDatabaseClient';

describe('userModel test', () => {
  let db: MongoMemoryServer;
  let connection: TestDatabaseClient;
  let user: User;

  beforeAll(async () => {
    db = new MongoMemoryServer();
    await db.start();

    connection = new TestDatabaseClient(db.getUri());
    await connection.connect();

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

  it('pasword vaildation', async () => {
    const result = await user.validatePassword('password');
    expect(result).toBe(true);
  });
});
