import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { configs } from '../configs/env';
import { ErrorCodes } from '../core/model/codes/errorCodes';
import { FAILURE } from '../core/model/codes/statusCodes';
import { ExpressRequest } from '../core/model/types/expressExtention';

export function authorize(req: ExpressRequest, res: Response, next: NextFunction)
{
	const authHeader: string = req.headers['authorization'] as string || '';
	const token = authHeader?.split(' ')[1];

	if (token == null)
	{
		return res.status(FAILURE.UNAUTHORIZED).send(ErrorCodes.Unauthorized);
	}

	jwt.verify(token, configs.accessTokenSecret, async(err, user: ExpressRequest['user']) =>
	{
		if (err)
		{
			return res.status(FAILURE.UNAUTHORIZED).send(ErrorCodes.Unauthorized);
		}

		req.user =
		{
			email: user.email,
			userId: user.userId,
		};

		req.logger.userId = user.userId;
		next();
	});
}