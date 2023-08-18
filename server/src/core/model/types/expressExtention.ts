import { Request, Response } from 'express';
import { Logger } from '../../../middlewares/logger';

export interface ExpressRequest extends Request
{
  user:
  {
	email: string;
	userId: string;
  };

  logger: Logger;
}

export type ExpressResponse = Response;