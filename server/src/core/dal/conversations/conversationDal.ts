import { ConversationsResponse } from '../../model/types/conversation/conversationResponse';
import { ErrorCode } from '../../model/types/errorCode';

export interface ConversationsDal
{
	getConversations(conversationId: string): Promise<ConversationsResponse[]>

	saveConversation(authors: string[]): Promise<ErrorCode>
	
	deleteConversation(ConversationId: string): Promise<ErrorCode>
}
