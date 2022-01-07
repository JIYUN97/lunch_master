/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import { validationMiddleware } from '../middleware/vaildation.middleware';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

export class UserController {
  public router: Router;
  private path = '/user';
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
  }

  async createUesr(
    req: Request<any, any, UserDto>,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const user = await this.userService.create(req.body);
    return res.send({ success: 'ok', data: user });
  }
}
