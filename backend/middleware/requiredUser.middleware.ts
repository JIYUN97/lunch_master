import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../util/error/HttpException';

export function requiredUserMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  return res.locals.user
    ? next()
    : next(new HttpException(401, 'Unauthorized'));
}
