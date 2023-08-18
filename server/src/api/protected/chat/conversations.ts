import { Response } from 'express';
import { User } from '../../../core/dal/users';
import { errorHandler, responseHandler } from '../../utils/responseHandler';
import { ExpressRequest } from '../../../core/model/types/expressExtention';
import { Dep } from '../../../core/model/dependecyModel/dep';
import { AllUsersModel } from '../../../core/model/dependecyModel/users/allUserModel';
import conversations from '../../../core/feature/chat/conversations';
import { Conversations } from '../../../core/dal/conversations';

export default async function(req: ExpressRequest, res: Response): Promise<void>
{
	try
	{
		const dep: Dep = {
			userModel: new User(req.logger),
			conversationModel: new Conversations(req.logger),
		};

		const allUsersModel = new AllUsersModel(req.user.userId, req.logger, dep);

		return await responseHandler(req, res, await conversations(allUsersModel));
	}
	catch(error)
	{
		errorHandler(req, res, error);
	}
}
