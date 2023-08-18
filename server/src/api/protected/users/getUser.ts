import { Response } from 'express';
import { User } from '../../../core/dal/users';
import { errorHandler, responseHandler } from '../../utils/responseHandler';
import { ExpressRequest } from '../../../core/model/types/expressExtention';
import { Dep } from '../../../core/model/dependecyModel/dep';
import { AllUsersModel } from '../../../core/model/dependecyModel/users/allUserModel';
import getUser from '../../../core/feature/users/getUser';

export default async function(req: ExpressRequest, res: Response): Promise<void>
{
	try
	{
		const dep: Dep = {
			userModel: new User(req.logger)
		};

		const userModel = new AllUsersModel(req.user.userId, req.logger, dep);

		return await responseHandler(req, res, await getUser(userModel));
	}
	catch(error)
	{
		errorHandler(req, res, error);
	}
}
