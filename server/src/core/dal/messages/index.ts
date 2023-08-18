import { ErrorCodes } from '../../model/codes/errorCodes';
import { Logger } from '../../../middlewares/logger';
import { MessagesResponse } from '../../model/types/conversation/messagesResponse';
import { MessagesDal } from './messageDal';
import { MessagesModel } from './schema';
import { ErrorCode } from '../../model/types/errorCode';

export class Messages implements MessagesDal
{
	public readonly logger: Logger;

	constructor (logger: Logger)
	{
		this.logger = logger;
	}

	async getMessages(conversationId: string, skip: number, limit = 100): Promise<MessagesResponse[]>
	{
		try
		{
			this.logger.log('DAL | Messages | Processing(getMessages)', 'INFO');
			const response: MessagesResponse[] = [];
			const messages = await MessagesModel.find({ conversationId }).sort({_id: -1}).skip(skip).limit(limit).exec();

			if (messages?.length)
			{
				for (const message of messages)
				{
					response.push({
						messageId: message.id,
						conversationId,
						author: message.author,
						body: message.body,
						media: message.media,
						time: message.time,
						isDeleted: message.isDeleted,
					});
				}

				return response;
			}

			return response;
		}
		catch (error)
		{
			this.logger.log('DAL | Messages | getMessages', 'ERROR', error);
			
			throw ErrorCodes.SomethingWentWrong;
		}
	}

	async saveMessage(conversationId: string, author: string, body: string, media: string): Promise<ErrorCode>
	{
		try
		{
			this.logger.log('DAL | Messages | Processing(saveMessage)', 'INFO');
			const message = new MessagesModel({
				conversationId,
				author,
				body: body || '',
				media: media || '',
				time: new Date(),
			});
			const response = await message.save();

			if (response.id)
			{
				return ErrorCodes.OK;
			}

			throw ErrorCodes.FailedToSaveMessage;
		}
		catch (error)
		{
			this.logger.log('DAL | Messages | saveMessage', 'ERROR', error);
			
			throw ErrorCodes.FailedToSaveMessage;
		}
	}

	async deleteMessage(messageId: string): Promise<ErrorCode>
	{
		try
		{
			this.logger.log('DAL | Messages | Processing(deleteMessage)', 'INFO');

			const response = await MessagesModel.updateOne({ _id: messageId }, { $set: { isDeleted: true } });

			if (response.modifiedCount)
			{
				return ErrorCodes.OK;
			}
		}
		catch (error)
		{
			this.logger.log('DAL | Messages | deleteMessage', 'ERROR', error);
			
			throw ErrorCodes.FailedToDeleteMessage;
		}
	}
}