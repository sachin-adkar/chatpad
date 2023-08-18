export interface ConversationsResponse
{
	conversationId: string,
	members: string[],
	time: Date,
	preview?: string,
	isMedia?: Boolean,
	isDeleted?: Boolean,
};