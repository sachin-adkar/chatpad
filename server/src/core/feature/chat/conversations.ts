import { AllUsersModel } from '../../model/dependecyModel/users/allUserModel';
import { ConversationsResponse } from '../../model/types/conversation/conversationResponse';

export default async function(conversationModel: AllUsersModel): Promise<ConversationsResponse[]>
{
	const logger = conversationModel.logger;

	try
	{
		logger.log('Feature : conversations  : Processing', 'INFO');

		return await conversationModel.dep.conversationModel
			.getConversations(conversationModel.userId);
	}
	catch(error)
	{
		logger.log('FEATURE | Users | conversations', 'ERROR', error);

		throw error;
	}
}
