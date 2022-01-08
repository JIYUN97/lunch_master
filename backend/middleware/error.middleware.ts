/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../error/HttpException';

export function errorMiddleWare(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const status = error.status ?? 500;
  const message = error.message ?? 'server error';
  res.status(status).send({ status, message });
}
