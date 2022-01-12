/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import { deserializeMiddleWare } from '../middleware/deserialize.middleware';
import { requiredUserMiddleWare } from '../middleware/requiredUser.middleware';
import { validationMiddleware } from '../middleware/validation.middleware';
import { signJwt } from '../util/jwt';
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
      `${this.path}/token`,
      validationMiddleware(UserDto),
      this.issueToken.bind(this),
    );

    this.router.get(
      `${this.path}/me`,
      deserializeMiddleWare,
      requiredUserMiddleWare,
      this.getDataFromToken.bind(this),
    );

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

  async issueToken(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const accessToken = await signJwt(
      { data: 'hello' },
      'accessTokenPrivateKey',
      {
        algorithm: 'RS256',
        expiresIn: '15h',
      },
    );
    return res.send({ success: 'ok', data: accessToken });
  }

  getDataFromToken(
    req: Request,
    res: Response,
  ): Response<any, Record<string, any>> {
    console.log(res.locals.user);
    return res.send({ success: 'ok', data: res.locals.user });
  }
}
