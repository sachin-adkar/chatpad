import { ErrorCodes } from '../../model/codes/errorCodes';
import { LoginModel } from '../../model/dependecyModel/users/loginModel';
import { ErrorCode } from '../../model/types/errorCode';
import { LoginSignupResponse } from '../../model/types/users/signupResponse';
import { PasswordHandler } from '../../utils/passwordHandler';
import { TokenHandler } from '../../utils/tokenHandler';

export default async function(loginModel: LoginModel): Promise<[ErrorCode, LoginSignupResponse]>
{
	const logger = loginModel.logger;

	try
	{
		logger.log('Feature : Login  : Processing', 'INFO');

		const userDetails = await loginModel.dep.userModel.getUserByEmail(loginModel.request.email);

		if (userDetails[0] !== ErrorCodes.OK)
		{
			return [userDetails[0], undefined];
		}

		if (!userDetails[1].isActive)
		{
			return [ErrorCodes.AccountDisabled, undefined];
		}

		const isValid =
			await PasswordHandler
				.validatePassword(loginModel.request.password, userDetails[1].password);

		if (isValid)
		{
			const tokens =
				await TokenHandler.generateToken(userDetails[1].userId, userDetails[1].email);

			const loginResponse: LoginSignupResponse =
			{
				email: userDetails[1].email,
				name: userDetails[1].name,
				userId: userDetails[1].userId,
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
				isAvatarSet: userDetails[1].isAvatarSet,
			};

			return [ErrorCodes.OK, loginResponse];
		}

		return [ErrorCodes.Unauthorized, undefined];
	}
	catch(error)
	{
		logger.log('FEATURE | Users | Login', 'ERROR', error);

		throw error;
	}
}
