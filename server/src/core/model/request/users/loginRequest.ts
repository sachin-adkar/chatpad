import { validate } from 'email-validator';
import { ErrorCodes } from '../../codes/errorCodes';

export class LoginRequest
{
	public readonly email: string;
	public password: string;

	constructor(email: string, password: string)
	{

		if (!email?.trim() || !validate(email))
		{
			throw ErrorCodes.InvalidEmail;
		}

		if (!password)
		{
			throw ErrorCodes.InvalidPassword;
		}

		this.email = email;
		this.password = password;
	}

}