import { validate } from 'email-validator';
import { PasswordHandler } from '../../../utils/passwordHandler';
import { ErrorCodes } from '../../codes/errorCodes';
import { RegularExpressions } from '../../codes/regex';

export class SignUpRequest
{
	public readonly name: string;
	public readonly email: string;
	public password: string;

	constructor(name: string, email: string, password: string)
	{
		if (!name?.trim())
		{
			throw ErrorCodes.InvalidName;
		}

		if (!email?.trim() || !validate(email))
		{
			throw ErrorCodes.InvalidEmail;
		}

		if (!password?.trim())
		{
			throw ErrorCodes.EmptyPassword;
		}

		if (password.includes(' '))
		{
			throw ErrorCodes.NoSpace;
		}

		if (!password.match(RegularExpressions.PASSWORD))
		{
			throw ErrorCodes.InvalidPassword;
		}

		this.name = name;
		this.email = email;
		this.password = password;
	}

	async hashPassword()
	{
		this.password = await PasswordHandler.generateHash(this.password);
	}
}