import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../util/jwt';

export function deserializeMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.headers.authorization) {
    return next();
  }
  const accessToken = req.headers.authorization.split('Bearer ')[1];
  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt<string>(accessToken, 'accessTokenPublicKey');
  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
}
