import { LoginRequest } from './../../request/users/loginRequest';
import { Logger } from '../../../../middlewares/logger';
import { Dep } from '../dep';

export class LoginModel
{
	public readonly request: LoginRequest;
	public readonly logger: Logger;
	public readonly dep: Dep;

	constructor(request: LoginRequest, logger: Logger, dep: Dep)
	{
		this.request = request;
		this.logger = logger;
		this.dep = dep;
	}
}