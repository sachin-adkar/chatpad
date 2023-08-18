import { ErrorCodes } from '../../model/codes/errorCodes';
import { AllUsersModel } from '../../model/dependecyModel/users/allUserModel';
import { SetAvatarModel } from '../../model/dependecyModel/users/setAvatarModel';
import { ErrorCode } from '../../model/types/errorCode';
import { GetUserResponse } from '../../model/types/users/getUserResponse';


export default async function(allUserModel: AllUsersModel): Promise<GetUserResponse[]>
{
	const logger = allUserModel.logger;

	try
	{
		logger.log('Feature : SetAvatarModel  : Processing', 'INFO');

		return await allUserModel.dep.userModel.getAllUsers(allUserModel.userId);
	}
	catch(error)
	{
		logger.log('FEATURE | Users | SetAvatar', 'ERROR', error);

		throw error;
	}
}
