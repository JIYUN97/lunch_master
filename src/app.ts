import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.setDB();
    this.setMiddleWare();
    this.setRouter();
    this.set404Error();
    this.setError();
  }

  private setDB(): void {
    const databaseName =
      process.env.NODE_ENV === 'production' ? 'admin' : 'test';
    mongoose
      .connect(`mongodb://localhost:27017/${databaseName}`)
      .then(() => console.log('db connected'))
      .catch((err) => console.log(err));
  }

  private setMiddleWare(): void {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    // this.app.use(express.static(path.resolve(__dirname, '/public')));
  }

  private setRouter(): void {
    this.app.get('/', (req, res) => {
      // vue로 build된 파일을 전송합니다.
      res.sendFile(path.join(__dirname, './public/index.html'));
    });
  }

  private set404Error(): void {
    this.app.use((req, res) => {
      res.status(404).send('404');
    });
  }

  private setError(): void {
    this.app.use((err: Error, req: Request, res: Response) => {
      console.log(err);
      res.status(500).send({ err: err.message });
    });
  }
}

export default App;
