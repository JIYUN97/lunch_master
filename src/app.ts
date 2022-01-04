import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

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
  }

  private setRouter(): void {
    this.app.get('/', (req, res) => {
      res.send('hello');
    });
    // controllers.forEach((controller) => {
    //   this.app.use("/", controller.router);
    // });
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
