import { ErrorCodes } from '../../model/codes/errorCodes';
import { AllUsersModel } from '../../model/dependecyModel/users/allUserModel';
import { GetUserResponse } from '../../model/types/users/getUserResponse';


export default async function(userModel: AllUsersModel): Promise<GetUserResponse>
{
	const logger = userModel.logger;

	try
	{
		logger.log('Feature : GetUser  : Processing', 'INFO');

		const response = await userModel.dep.userModel.getUserById(userModel.userId);

		if (response[0] === ErrorCodes.OK)
		{
			return response[1]
		}
		
		throw response[0];
	}
	catch(error)
	{
		logger.log('FEATURE | Users | GetUser', 'ERROR', error);

		throw error;
	}
}
