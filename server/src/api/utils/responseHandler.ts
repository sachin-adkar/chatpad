import { Response } from 'express';
import { CustomErrors } from '../../core/model/codes/customError';
import { ErrorCodes } from '../../core/model/codes/errorCodes';
import { FAILURE, SUCCESS } from '../../core/model/codes/statusCodes';
import { ErrorCode } from '../../core/model/types/errorCode';
import { ExpressRequest } from '../../core/model/types/expressExtention';


export function responseHandler(req: ExpressRequest, res: Response, data: any)
{
	req.logger.log(`Sending Response | URL: ${req.url}`, 'INFO', data);
	req.logger.transport();

	res.send(data);
}

export function errorHandler(req: ExpressRequest, res: Response, error: ErrorCode)
{
	req.logger.log(`Sending Response | URL: ${req.url}`, 'ERROR', error);

	if (CustomErrors.DATAFEED_ERROR.includes(error.error))
	{
		req.logger.log(`Sending Error Response | URL: ${req.url}`, 'ERROR', {statusCode: FAILURE.BAD_REQUEST});
		req.logger.transport();
		res.status(FAILURE.BAD_REQUEST).send(error);
	}
	else
	{
		req.logger.log(`Sending Response | URL: ${req.url}`, 'ERROR', {statusCode: FAILURE.INTERNAL_SERVER_ERROR});
		req.logger.transport();
		res.status(FAILURE.INTERNAL_SERVER_ERROR).send(ErrorCodes.SomethingWentWrong);
	}
}
