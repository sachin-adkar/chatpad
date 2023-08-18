import { endpoints } from "../configs/env";
import request from "./request";

export const getAccessToken = async() =>
{
	return JSON.parse(await localStorage.getItem('chatpad-user') || '{}');
}

export const validateToken = async(navigate: any, toast: any, toastConfigs: any) =>
{
	const { accessToken } = await getAccessToken();

	console.log(await getAccessToken())
	if (accessToken)
	{
		try
		{
			const response = await request('GET', endpoints.validateToken, {}, accessToken)
		
			if (response.status === 200)
			{
				navigate('/');
			}
			else
			{
				navigate('/login');
			}
		}
		catch(error: any)
		{
			if (error?.response?.data?.description)
			{
				toast.error(error.response.data.description, toastConfigs);
			}
			else
			{
				toast.error('Something went wrong', toastConfigs);
			}
		}
	}
	else
	{
		navigate('/login');
	}

}