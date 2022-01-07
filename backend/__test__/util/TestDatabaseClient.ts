/* eslint-disable @typescript-eslint/no-empty-function */
import mongoose from 'mongoose';

//SingleTon Pattern으로 만듬
export class TestDatabaseClient {
  public constructor(private dbUri: string) {}

  public async connect(): Promise<void> {
    await mongoose.connect(this.dbUri, {
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
