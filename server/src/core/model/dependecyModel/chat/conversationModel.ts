import { Logger } from '../../../../middlewares/logger';
import { Dep } from '../dep';

export class ConversationModel
{
	public readonly recipientId: string;
	public readonly conversationId: string;
	public readonly logger: Logger;
	public readonly dep: Dep;

	constructor(recipientId: string, conversationId: string, logger: Logger, dep: Dep)
	{
		this.recipientId = recipientId;
		this.conversationId = conversationId;
		this.logger = logger;
		this.dep = dep;
	}
}