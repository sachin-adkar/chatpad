import { validate } from 'email-validator';
import { ErrorCodes } from '../../codes/errorCodes';

export class SetAvatarRequest
{
	public readonly userId: string;
	public readonly avatar: string;

	constructor(userId: string, avatar: string)
	{

		if (!avatar?.trim())
		{
			throw ErrorCodes.InvalidAvatar;
		}

		if (!userId)
		{
			throw ErrorCodes.InvalidUserId;
		}

		this.userId = userId;
		this.avatar = avatar;
	}

}