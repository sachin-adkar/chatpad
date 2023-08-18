import { SignUpRequest } from './../../request/users/signupRequest';
import { Logger } from '../../../../middlewares/logger';
import { Dep } from '../dep';

export class SignupModel
{
	public readonly request: SignUpRequest;
	public readonly logger: Logger;
	public readonly dep: Dep;

	constructor(request: SignUpRequest, logger: Logger, dep: Dep)
	{
		this.request = request;
		this.logger = logger;
		this.dep = dep;
	}
}