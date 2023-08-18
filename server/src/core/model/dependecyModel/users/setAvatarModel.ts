import { Logger } from '../../../../middlewares/logger';
import { Dep } from '../dep';
import { SetAvatarRequest } from '../../request/users/setAvatarRequest';

export class SetAvatarModel
{
	public readonly request: SetAvatarRequest;
	public readonly logger: Logger;
	public readonly dep: Dep;

	constructor(request: SetAvatarRequest, logger: Logger, dep: Dep)
	{
		this.request = request;
		this.logger = logger;
		this.dep = dep;
	}
}