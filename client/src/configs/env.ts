import { KeyValue } from "../utils/codes/keyValue";

export const config: KeyValue =
{
	baseUrl: String(process.env.REACT_APP_URL) || '',
	localStorageKey: 'chatpad-user'
};

export const endpoints = 
{
	register: `${config.baseUrl}open/register`,
	login: `${config.baseUrl}open/login`,
	validateToken: `${config.baseUrl}protected/validateToken`,
	setAvatar: `${config.baseUrl}protected/setAvatar`,
	allUsersRoute: `${config.baseUrl}protected/allUsers`
}