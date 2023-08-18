import { MessagesResponse } from '../../model/types/conversation/messagesResponse';
import { ErrorCode } from '../../model/types/errorCode';

export interface MessagesDal
{
	getMessages(conversationId: string, skip: number): Promise<MessagesResponse[]>

	saveMessage(conversationId: string, author: string, body: string, media: string): Promise<ErrorCode>
	
	deleteMessage(messageId: string): Promise<ErrorCode>
}
