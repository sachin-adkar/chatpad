import { Response } from 'express';
import { User } from '../../core/dal/users';
import signup from '../../core/feature/users/signup';
import { ErrorCodes } from '../../core/model/codes/errorCodes';
import { Dep } from '../../core/model/dependecyModel/dep';
import { SignupModel } from '../../core/model/dependecyModel/users/signupModel';
import { SignUpRequest } from '../../core/model/request/users/signupRequest';
import { ExpressRequest } from '../../core/model/types/expressExtention';
import { errorHandler, responseHandler } from '../utils/responseHandler';

export default async function(req: ExpressRequest, res: Response): Promise<void>
{
	try
	{
		const request = new SignUpRequest(
			req.body.username,
			req.body.email,
			req.body.password);

		const dep: Dep = {
			userModel: new User(req.logger)
		};

		const signupModel = new SignupModel(request, req.logger, dep);
		const response = await signup(signupModel);

		if (response[0] === ErrorCodes.OK)
		{
			responseHandler(req, res, response[1]);
		}
		else
		{
			errorHandler(req, res, response[0]);
		}
	}
	catch(error)
	{
		errorHandler(req, res, error);
	}
}
