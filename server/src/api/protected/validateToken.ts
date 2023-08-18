import { Response } from 'express';
import { ErrorCodes } from '../../core/model/codes/errorCodes';
import { errorHandler, responseHandler } from '../utils/responseHandler';
import { ExpressRequest } from '../../core/model/types/expressExtention';

export default async function(req: ExpressRequest, res: Response): Promise<void>
{
	try
	{
		responseHandler(req, res, ErrorCodes.OK);
	}
	catch(error)
	{
		errorHandler(req, res, error);
	}
}
