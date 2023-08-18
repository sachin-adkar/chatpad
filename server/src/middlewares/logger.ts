import { randomUUID } from 'crypto';
// import { Log } from '../core/dal/logs';
import { ErrorCodes } from '../core/model/codes/errorCodes';
// import { EventNames } from '../core/model/codes/eventNames';

export class Logger
{
	public readonly requestId: string;
	private _userId: string;
	public logQueue: string[];

	constructor(requestId?: string)
	{
		this.requestId = requestId || randomUUID().substring(0, 18);
		this.logQueue = [];
	}

	set userId(userId: string)
	{
		this._userId = userId;
	}

	logMask(data: any = {})
	{
		if (data['password'])
		{
			data['password'] = '****';
		}

		if (data['refreshToken'])
		{
			data['refreshToken'] = '****';
		}

		if (data['accessToken'])
		{
			data['accessToken'] = '****';
		}

		if (data[0])
		{
			data = Object.values(data);
			for (let i = 0; i < data.length; i++)
			{
				if (data[i] && data[i]['configurations'] && data[i]['configurations']['client_id'])
				{
					data[i]['configurations']['client_id'] = '****';
				}

				if (data[i] && data[i]['configurations'] && data[i]['configurations']['client_secret'])
				{
					data[i]['configurations']['client_secret'] = '****';
				}

				if (data[i] && data[i]['configurations'] && data[i]['configurations']['password'])
				{
					data[i]['configurations']['password'] = '****';
				}

				if (data[i] && data[i]['configurations'] && data[i]['configurations']['apiKey'])
				{
					data[i]['configurations']['apiKey'] = '****';
				}
			}
		}

		return data;
	}

	log (message: string, level: string, data: any = null)
	{
		console.log('Processing', message, data);
		this.logQueue.push(
			JSON.stringify({ message, level, data: this.logMask(JSON.parse(JSON.stringify(data)) || {}) }));
		// process.emit(EventNames.LOGSTREAM as any,
		// 	{
		// 		timeStamp: new Date().toLocaleString('en-GB'),
		// 		message,
		// 		level,
		// 		data: this.logMask(JSON.parse(JSON.stringify(data)) || {}) } as any);

		// {
		// 	message,
		// 	level, data: this.logMask(Object.assign({}, data)) });
	}

	async transport(): Promise<void>
	{
		try
		{
			// if (this.logQueue?.length)
			// {
			// 	const result =  await Log.saveLogDetails(this.logQueue, this.requestId, this._userId);

			// 	if (result !== ErrorCodes.OK)
			// 	{
			// 		console.log('Failed to insert logs');
			// 	}
			// }

			console.log(this.logQueue);
			this.logQueue = [];
		}
		catch(error)
		{
			console.log('Failed to insert logs');
		}
	}

}