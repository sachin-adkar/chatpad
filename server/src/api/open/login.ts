import { Response } from 'express';
import { User } from '../../core/dal/users';
import coreLogin from '../../core/feature/users/login';
import { ErrorCodes } from '../../core/model/codes/errorCodes';
import { LoginRequest } from '../../core/model/request/users/loginRequest';
import { LoginModel } from '../../core/model/dependecyModel/users/loginModel';
import { errorHandler, responseHandler } from '../utils/responseHandler';
import { ExpressRequest } from '../../core/model/types/expressExtention';
import { Dep } from '../../core/model/dependecyModel/dep';

export default async function(req: ExpressRequest, res: Response): Promise<void>
{
	try
	{
		const request = new LoginRequest(
			req.body.email,
			req.body.password);

		const dep: Dep = {
			userModel: new User(req.logger)
		};

		const loginModel = new LoginModel(request, req.logger, dep);

		const response = await coreLogin(loginModel);

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
