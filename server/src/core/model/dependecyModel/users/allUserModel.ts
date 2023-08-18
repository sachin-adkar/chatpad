import { LoginRequest } from './../../request/users/loginRequest';
import { Logger } from '../../../../middlewares/logger';
import { Dep } from '../dep';

export class AllUsersModel
{
	public readonly userId: string;
	public readonly logger: Logger;
	public readonly dep: Dep;

	constructor(userId: string, logger: Logger, dep: Dep)
	{
		this.userId = userId;
		this.logger = logger;
		this.dep = dep;
	}
}