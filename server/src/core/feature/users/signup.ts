import { SignupModel } from './../../model/dependecyModel/users/signupModel';
import { ErrorCodes } from '../../model/codes/errorCodes';
import { ErrorCode } from '../../model/types/errorCode';
import { LoginSignupResponse } from '../../model/types/users/signupResponse';
import { TokenHandler } from '../../utils/tokenHandler';

export default async function(signupModel: SignupModel): Promise<[ErrorCode, LoginSignupResponse]>
{
	const logger = signupModel.logger;

	try
	{
		logger.log('Feature : SignUp: Processing', 'INFO');


		await signupModel.request.hashPassword();

		const result = await
		signupModel.dep.userModel.saveUserDetails(signupModel.request);

		if (result[0] !== ErrorCodes.OK)
		{
			throw result[0];
		}

		const tokens = await
		TokenHandler.generateToken(result[1], signupModel.request.email);

		const signupResponse: LoginSignupResponse =
		{
			name: signupModel.request.name,
			userId: result[1],
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			email: signupModel.request.email,
			isAvatarSet: false
		};

		return [ErrorCodes.OK, signupResponse];
	}
	catch(error)
	{
		logger.log('FEATURE | Users | signUp | Error', 'ERROR', error);

		throw error;
	}
}
