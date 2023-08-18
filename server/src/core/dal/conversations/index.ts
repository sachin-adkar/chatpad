import { ErrorCodes } from '../../model/codes/errorCodes';
import { Logger } from '../../../middlewares/logger';
import { ErrorCode } from '../../model/types/errorCode';
import { ConversationsDal } from './conversationDal';
import { ConversationModel } from './schema';
import { ConversationsResponse } from '../../model/types/conversation/conversationResponse';
import { Messages } from '../messages';

export class Conversations implements ConversationsDal
{
	public readonly logger: Logger;

	constructor (logger: Logger)
	{
		this.logger = logger;
	}

	async getConversations(authorId: string): Promise<ConversationsResponse[]>
	{
		try
		{
			this.logger.log('DAL | Conversations | Processing(getConversations)', 'INFO');

			const conversations = await ConversationModel.aggregate(
				[
					{
					  $match:
						{
						  members: authorId,
						  isDeleted: false
						},
					},
					{
					  $lookup: {
						from: "messages",
						localField: "_id",
						foreignField: "conversationId",
						as: "messages",
					  },
					},
					{
					  $project: {
						members: 1,
						message: {
						  $last: "$messages",
						},
						updatedAt: 1,
						conversationId: '$_id'
					  },
					},
					{
						$sort: { _id: -1 }
					}
				  ]).exec();

			return conversations;
		}
		catch (error)
		{
			this.logger.log('DAL | Conversations | getConversations', 'ERROR', error);
			
			throw ErrorCodes.SomethingWentWrong;
		}
	}

	async saveConversation(members: string[], isBot = false): Promise<ErrorCode>
	{
		try
		{
			this.logger.log('DAL | Conversations | Processing(saveConversation)', 'INFO');
			const message = new ConversationModel({
				members,
				isBot,
				time: new Date(),
				updatedAt:  new Date(),
				createdAt: new Date(),
			});

			const response = await message.save();

			if (response.id)
			{
				return ErrorCodes.OK;
			}

			throw ErrorCodes.FailedToSaveConversation;
		}
		catch (error)
		{
			this.logger.log('DAL | Conversations | saveConversation', 'ERROR', error);
			
			throw ErrorCodes.FailedToSaveConversation;
		}
	}

	async deleteConversation(conversationId: string): Promise<ErrorCode>
	{
		try
		{
			this.logger.log('DAL | Conversations | Processing(DeleteConversation)', 'INFO');

			const response = await ConversationModel.updateOne({ _id: conversationId }, { $set: { isDeleted: true } });

			if (response.modifiedCount)
			{
				return ErrorCodes.OK;
			}
		}
		catch (error)
		{
			this.logger.log('DAL | Conversations | DeleteConversation', 'ERROR', error);
			
			throw ErrorCodes.FailedToDeleteConversation;
		}
	}
}