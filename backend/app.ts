import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';
import config from 'config';
import logger from './util/logger';
import { errorMiddleWare } from './middleware';
import { Controller } from './util/types/Controller';

class App {
  app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.setDB();
    this.setMiddleWare();
    this.setRouter(controllers);
    this.set404Error();
    this.setError();
  }

  private setDB(): void {
    const dbName = config.get<string>('dbName');
    mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w19ct.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      )
      .then(() => logger.info('db connected'))
      .catch((err) => logger.error(err));
  }

  private setMiddleWare(): void {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  private setRouter(controllers: Controller[]): void {
    this.app.get('/', (req, res) => {
      // vue로 build된 파일을 전송합니다.
      res.sendFile(path.join(__dirname, './public/index.html'));
    });

    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private set404Error(): void {
    this.app.use((req, res) => {
      res.status(404).send('404');
    });
  }

  private setError(): void {
    this.app.use(errorMiddleWare);
  }
}

export default App;
