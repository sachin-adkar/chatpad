import axios, { Method } from "axios";
import queryString from 'querystringify';

export default async function remoteCall(
	method: Method,
	url: string,
	params: any,
	token: string): Promise<any>
{
	try
	{
		let headers: any = {};
		let response: any;

		if (token)
		{
			headers.Authorization = `Bearer ${token}`;
		}

		if (method === 'POST')
		{
			response = await axios.post(
				url,
				params,
				{ headers });
		}
		else
		{
			response =
				await axios.get(url + queryString.stringify(params, true), { headers });
		}

		console.log('response', response)
		return response;
	}
	catch (error)
	{
		console.log('Error', error);
		return error;
	}
};