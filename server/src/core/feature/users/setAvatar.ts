import { ErrorCodes } from '../../model/codes/errorCodes';
import { SetAvatarModel } from '../../model/dependecyModel/users/setAvatarModel';
import { ErrorCode } from '../../model/types/errorCode';


export default async function(setAvatarModel: SetAvatarModel): Promise<ErrorCode>
{
	const logger = setAvatarModel.logger;

	try
	{
		logger.log('Feature : SetAvatarModel  : Processing', 'INFO');

		return await setAvatarModel.dep.userModel.setAvatar(setAvatarModel.request);
	}
	catch(error)
	{
		logger.log('FEATURE | Users | SetAvatar', 'ERROR', error);

		throw error;
	}
}
