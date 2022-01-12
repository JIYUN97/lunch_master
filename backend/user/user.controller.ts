/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import { validationMiddleware } from '../middleware/validation.middleware';
import { Controller } from '../util/types/Controller';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

export class UserController implements Controller {
  public router: Router;
  public path = '/user';

  constructor(private readonly userService: UserService) {
    this.router = Router();
    this.initRouter();
  }

  private initRouter(): void {
    this.router.post(
      this.path,
      validationMiddleware(UserDto),
      this.createUesr.bind(this),
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(UserDto),
      this.login.bind(this),
    );
  }

  async createUesr(
    req: Request<any, any, UserDto>,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const user = await this.userService.create(req.body);
    return res.send({ success: 'ok', data: user });
  }

  async login(req: Request, res: Response): Promise<Response> {
    const user = await this.userService.login(req.body);
    return res.json({ success: 'ok', data: user });
  }
}
