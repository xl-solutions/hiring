import { Request, Response, NextFunction } from 'express';

import ServerError from '../errors/ServerError';

export default async (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof ServerError) {
    const { statusCode, message } = err;

    return response.status(statusCode).json({
      status: 'error',
      message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
