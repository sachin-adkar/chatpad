import { Response } from 'express';
import { User } from '../../../core/dal/users';
import { errorHandler, responseHandler } from '../../utils/responseHandler';
import { ExpressRequest } from '../../../core/model/types/expressExtention';
import { Dep } from '../../../core/model/dependecyModel/dep';
import { SetAvatarRequest } from '../../../core/model/request/users/setAvatarRequest';
import { SetAvatarModel } from '../../../core/model/dependecyModel/users/setAvatarModel';
import setAvatar from '../../../core/feature/users/setAvatar';

export default async function(req: ExpressRequest, res: Response): Promise<void>
{
	try
	{
		const request = new SetAvatarRequest(
			req.user.userId,
			req.body.avatar);

		const dep: Dep = {
			userModel: new User(req.logger)
		};

		const setAvatarModel = new SetAvatarModel(request, req.logger, dep);

		return await responseHandler(req, res, await setAvatar(setAvatarModel));
	}
	catch(error)
	{
		errorHandler(req, res, error);
	}
}
