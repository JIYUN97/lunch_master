/* eslint-disable @typescript-eslint/no-empty-function */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

//SingleTon Pattern으로 만듬
export class TestDatabase {
  private static instance: TestDatabase;
  private mongod = new MongoMemoryServer();

  private constructor() {}

  public static getInstance(): TestDatabase {
    if (!TestDatabase.instance) {
      return new TestDatabase();
    }
    return TestDatabase.instance;
  }

  public async connect(): Promise<void> {
    await this.mongod.start();
    const uri = this.mongod.getUri();
    await mongoose.connect(uri, {
      maxPoolSize: 10,
    });
  }

  public async close(): Promise<void> {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  public async clear(): Promise<void> {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
