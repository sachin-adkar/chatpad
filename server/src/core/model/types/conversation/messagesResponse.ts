export interface MessagesResponse
{
	messageId: string,
	conversationId: string,
	author: string,
	body: string,
	media: string,
	time: Date,
	isDeleted: string,
};