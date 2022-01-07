/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line import/named
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { HttpException } from '../error/HttpException';

export function validationMiddleware<T>(
  type: ClassConstructor<T>,
  skipMissingProperties = false,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const vaildateError = await validate(
      plainToInstance(type, req.body) as Record<string, unknown>,
      {
        skipMissingProperties,
      },
    );

    if (vaildateError.length > 0) {
      const errorMessage = vaildateError
        .map((error: ValidationError) => {
          return Object.values(error.constraints || 'error');
        })
        .join(',');
      next(new HttpException(400, errorMessage));
    } else {
      next();
    }
  };
}
